document.addEventListener('DOMContentLoaded', () => {
    const resultContent = document.getElementById('result-content');
    const backBtn = document.getElementById('back-btn');
    const canvas = document.getElementById('result-chart');

    // 从 URL 参数中获取结果数据
    const urlParams = new URLSearchParams(window.location.search);
    const result = {
        D: parseInt(urlParams.get('D')),
        I: parseInt(urlParams.get('I')),
        S: parseInt(urlParams.get('S')),
        C: parseInt(urlParams.get('C'))
    };

    // 计算个性类型
    const personalityType = calculatePersonalityType(result);

    // 显示结果
    resultContent.innerHTML = `
        <h3>您的个性类型：${personalityType}</h3>
        <p>支配性 (D): ${result.D}</p>
        <p>影响性 (I): ${result.I}</p>
        <p>稳定性 (S): ${result.S}</p>
        <p>谨慎性 (C): ${result.C}</p>
    `;

    // 绘制结果图表
    drawResultChart(canvas, result);

    // 返回首页按钮
    backBtn.addEventListener('click', () => {
        window.location.href = 'index.html';
    });
});

function calculatePersonalityType(result) {
    const dominantTraits = Object.entries(result)
        .filter(([_, score]) => score > 10)
        .sort(([, a], [, b]) => b - a)
        .map(([trait]) => trait);

    return dominantTraits.join('') || '未确定';
}

function drawResultChart(canvas, result) {
    const ctx = canvas.getContext('2d');
    const width = canvas.width;
    const height = canvas.height;
    const centerX = width / 2;
    const centerY = height / 2;
    const radius = Math.min(width, height) / 2 - 40;

    // 设置背景
    ctx.fillStyle = '#f0f0f0';
    ctx.fillRect(0, 0, width, height);

    // 绘制同心圆
    for (let i = 1; i <= 4; i++) {
        ctx.beginPath();
        ctx.arc(centerX, centerY, radius * i / 4, 0, 2 * Math.PI);
        ctx.strokeStyle = 'rgba(0, 0, 0, 0.1)';
        ctx.stroke();
    }

    // 绘制坐标轴
    ctx.beginPath();
    ctx.moveTo(centerX, 0);
    ctx.lineTo(centerX, height);
    ctx.moveTo(0, centerY);
    ctx.lineTo(width, centerY);
    ctx.strokeStyle = 'rgba(0, 0, 0, 0.5)';
    ctx.stroke();

    // 绘制刻度
    ctx.font = '12px Arial';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillStyle = 'rgba(0, 0, 0, 0.5)';
    for (let i = -40; i <= 40; i += 20) {
        if (i !== 0) {
            const x = centerX + radius * i / 40;
            const y = centerY + radius * i / 40;
            ctx.fillText(i.toString(), x, centerY + 15);
            ctx.fillText(i.toString(), centerX - 20, y);
        }
    }

    // 绘制DISC标签
    ctx.font = 'bold 16px Arial';
    ctx.fillStyle = '#333';
    ctx.fillText('D', centerX, 20);
    ctx.fillText('I', width - 20, centerY);
    ctx.fillText('S', centerX, height - 20);
    ctx.fillText('C', 20, centerY);

    // 绘制得分点和连线
    const points = [
        { x: centerX, y: centerY - radius * result.D / 40 },
        { x: centerX + radius * result.I / 40, y: centerY },
        { x: centerX, y: centerY + radius * result.S / 40 },
        { x: centerX - radius * result.C / 40, y: centerY }
    ];

    ctx.beginPath();
    ctx.moveTo(points[0].x, points[0].y);
    for (let i = 1; i < points.length; i++) {
        ctx.lineTo(points[i].x, points[i].y);
    }
    ctx.closePath();
    ctx.fillStyle = 'rgba(75, 192, 192, 0.2)';
    ctx.fill();
    ctx.strokeStyle = 'rgba(75, 192, 192, 1)';
    ctx.lineWidth = 2;
    ctx.stroke();

    // 绘制得分点
    points.forEach((point, index) => {
        ctx.beginPath();
        ctx.arc(point.x, point.y, 5, 0, 2 * Math.PI);
        ctx.fillStyle = 'rgba(75, 192, 192, 1)';
        ctx.fill();
        ctx.strokeStyle = 'white';
        ctx.lineWidth = 2;
        ctx.stroke();

        // 在点旁边显示具体分数
        ctx.font = '14px Arial';
        ctx.fillStyle = '#333';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        const score = ['D', 'I', 'S', 'C'][index];
        ctx.fillText(`${score}: ${result[score]}`, point.x, point.y - 15);
    });
}
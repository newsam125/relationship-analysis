# 家庭关系测评系统

这是一个基于 DISC 行为风格理论的家庭关系测评系统。该系统提供自我评估、他人评估和家庭关系评估三种功能。

## 功能特点

1. 自我评估：用户可以完成 DISC 个性测评，了解自己的行为风格。
2. 他人评估：用户可以对他人进行 DISC 个性测评，了解他人的行为风格。
3. 家庭关系评估：（待实现）用户可以评估家庭成员之间的关系。
4. 结果展示：测评完成后，系统会生成图表展示结果。

## 文件结构

- `index.html`: 主页面，提供三种测评入口
- `personal.html`: 自我评估页面
- `others-assessment.html`: 他人评估页面
- `result.html`: 测评结果展示页面
- `styles.css`: 全局样式表
- `script.js`: 主要 JavaScript 文件
- `questions.js`: 存储测评问题的 JavaScript 文件
- `others-assessment.js`: 他人评估相关的 JavaScript 文件
- `result.js`: 结果展示相关的 JavaScript 文件

## 使用说明

1. 打开 `index.html` 文件，选择需要的测评类型。
2. 按照页面提示完成测评。
3. 提交后查看测评结果。

## 注意事项

- 本测评系统仅供参考，不应作为专业心理评估的替代。
- 请确保在使用他人评估功能时征得被评估者的同意。

## 未来计划

- 实现家庭关系评估功能
- 优化用户界面和体验
- 添加更多的结果分析和建议

## 环境设置

1. 复制.env.example文件并重命名为.env
2. 在.env文件中填入您的实际API密钥
3. 确保.env文件已被添加到.gitignore中,不会被提交到版本控制系统

## 贡献

欢迎提出建议和改进意见。如果您想为这个项目做出贡献,请提交 pull request 或开启 issue。

## 许可证

[MIT License](https://opensource.org/licenses/MIT)
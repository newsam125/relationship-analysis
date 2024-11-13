from flask import Flask, request, jsonify
from ai_service import RelationshipAnalyzer

app = Flask(__name__)
analyzer = RelationshipAnalyzer()

@app.route('/api/analyze-relationship', methods=['POST'])
def analyze_relationship():
    try:
        data = request.get_json()
        
        # 生成分析报告
        report = analyzer.generate_analysis(
            self_type=data['selfType'],
            other_type=data['otherType'],
            relationship=data['relationship'],
            context=data['context'],
            challenge=data['challenge']
        )
        
        return jsonify(report)
        
    except Exception as e:
        return jsonify({"error": str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True) 
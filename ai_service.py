import os
import openai
from dotenv import load_dotenv

# 加载环境变量
load_dotenv()

# 配置OpenAI API
openai.api_key = os.getenv('OPENAI_API_KEY')
openai.api_base = os.getenv('OPENAI_API_BASE')

class RelationshipAnalyzer:
    def __init__(self):
        self.model = os.getenv('OPENAI_API_MODEL')
        
    def generate_analysis(self, self_type, other_type, relationship, context, challenge):
        # 构建提示词
        prompt = f"""
        请作为一位DISC行为风格分析专家，根据以下信息生成一份详细的关系分析报告：
        
        1. 当事人DISC类型：{self_type}
        2. 对方DISC类型：{other_type}
        3. 关系类型：{relationship}
        4. 情境描述：{context}
        5. 主要挑战：{challenge}
        
        请从以下几个方面进行分析：
        1. 关系概况：分析双方DISC类型的基本特点和互动模式
        2. 行为风格分析：
           - 个人行为风格特点
           - 对方行为风格特点
           - 双方互动模式分析
        3. 具体建议：
           - 沟通技巧建议
           - 关系改善建议
           
        请用专业但易懂的语言输出分析结果。
        """
        
        try:
            # 调用API生成分析
            response = openai.ChatCompletion.create(
                model=self.model,
                messages=[
                    {"role": "system", "content": "你是一位专业的DISC行为风格分析专家，擅长分析人际关系并提供建设性建议。"},
                    {"role": "user", "content": prompt}
                ],
                temperature=0.7,
                max_tokens=2000
            )
            
            # 解析返回的内容
            analysis = response.choices[0].message.content
            
            # 将分析结果结构化
            sections = self._parse_analysis(analysis)
            
            return sections
            
        except Exception as e:
            print(f"API调用错误: {str(e)}")
            return {
                "error": "生成分析报告时出现错误，请稍后重试"
            }
    
    def _parse_analysis(self, analysis):
        # 这里可以添加更复杂的解析逻辑
        # 当前使用简单的分段方式
        sections = {
            "overview": "",
            "selfAnalysis": "",
            "otherAnalysis": "",
            "interactionPattern": "",
            "communicationTips": "",
            "improvementSuggestions": ""
        }
        
        # 简单的文本分割处理
        parts = analysis.split('\n\n')
        
        for part in parts:
            if "关系概况" in part:
                sections["overview"] = part
            elif "个人行为风格" in part:
                sections["selfAnalysis"] = part
            elif "对方行为风格" in part:
                sections["otherAnalysis"] = part
            elif "互动模式" in part:
                sections["interactionPattern"] = part
            elif "沟通技巧" in part:
                sections["communicationTips"] = part
            elif "关系改善" in part:
                sections["improvementSuggestions"] = part
                
        return sections 
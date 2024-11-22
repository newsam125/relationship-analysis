import React from 'react';

const RelationshipDashboard = () => {
  const sections = [
    {
      title: "互动模式分析",
      items: [
        {
          title: "沟通风格",
          description: "您倾向于采用温和且富有同理心的沟通方式，善于倾听他人观点",
          score: 85
        },
        {
          title: "亲密度管理",
          description: "在建立关系时较为谨慎，需要时间建立信任",
          score: 72
        },
        {
          title: "冲突处理",
          description: "倾向于采用妥协和协商的方式解决冲突",
          score: 68
        }
      ]
    },
    {
      title: "人际关系地图",
      items: [
        {
          title: "核心圈层",
          description: "最亲密的人际关系",
          traits: ["高度信任", "情感依赖", "频繁互动"]
        },
        {
          title: "社交圈层",
          description: "日常社交网络",
          traits: ["互惠互利", "适度联系", "共同兴趣"]
        },
        {
          title: "外围圈层",
          description: "泛社交关系",
          traits: ["礼貌往来", "低频互动", "功能性联系"]
        }
      ]
    },
    {
      title: "改善建议",
      items: [
        {
          title: "沟通技巧提升",
          points: [
            "练习主动表达想法和需求",
            "增加非语言沟通的意识",
            "培养积极倾听的能力"
          ]
        },
        {
          title: "关系维护策略",
          points: [
            "定期与重要他人保持联系",
            "在适当时机表达关心和感谢",
            "主动参与群体活动"
          ]
        }
      ]
    }
  ];

  return (
    <div className="w-full max-w-4xl p-4 space-y-8">
      {sections.map((section) => (
        <div key={section.title} className="bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-bold mb-4">{section.title}</h2>
          <div className="space-y-4">
            {section.items.map((item) => (
              <div key={item.title} className="border rounded-lg p-4">
                <h3 className="font-semibold text-lg mb-2">{item.title}</h3>
                {item.description && (
                  <p className="text-gray-600 mb-2">{item.description}</p>
                )}
                {item.score !== undefined && (
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-blue-600 h-2 rounded-full"
                      style={{ width: `${item.score}%` }}
                    />
                  </div>
                )}
                {item.traits && (
                  <div className="flex flex-wrap gap-2">
                    {item.traits.map((trait) => (
                      <span key={trait} className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">
                        {trait}
                      </span>
                    ))}
                  </div>
                )}
                {item.points && (
                  <ul className="space-y-2">
                    {item.points.map((point) => (
                      <li key={point} className="flex items-start gap-2">
                        <span>•</span>
                        <span>{point}</span>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default RelationshipDashboard;

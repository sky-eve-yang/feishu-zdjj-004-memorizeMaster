"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const block_basekit_server_api_1 = require("@lark-opdev/block-basekit-server-api");
const { t } = block_basekit_server_api_1.field;
// 通过addDomainList添加请求接口的域名
block_basekit_server_api_1.basekit.addDomainList(['replit.app']);
block_basekit_server_api_1.basekit.addField({
    // 定义捷径的i18n语言资源
    i18n: {
        messages: {
            'zh-CN': {
                'create_time': '创建时间',
                'start_datetime': '开始日期',
                'placeholderStartDate': '选择开始日期',
                'date1': '1 天后',
                'date2': '2 天后',
                'date3': '7 天后',
                'date4': '15 天后',
                'date5': '30 天后',
                'checkbox1': '1 天后是否复习',
                'checkbox2': '2 天后是否复习',
                'checkbox3': '7 天后是否复习',
                'checkbox4': '15 天后是否复习',
                'checkbox5': '30 天后是否复习',
                'help_document': '点击查看说明文档'
            },
            'en-US': {
                'create_time': 'Creation Time',
                'start_datetime': 'Start Date',
                'placeholderStartDate': 'Select Start Date',
                "date1": "1 day later",
                "date2": "2 days later",
                "date3": "7 days later",
                "date4": "15 days later",
                "date5": "30 days later",
                'checkbox1': 'Did you review after 1 day?',
                'checkbox2': 'Did you review after 2 days?',
                'checkbox3': 'Did you review after 7 days?',
                'checkbox4': 'Did you review after 15 days?',
                'checkbox5': 'Did you review after 30 days?',
                'help_document': 'Click here to view the documentation'
            },
            'ja-JP': {
                'create_time': '作成時間',
                'start_datetime': '開始日',
                'placeholderStartDate': '開始日を選択してください',
                "date1": "1日後",
                "date2": "2日後",
                "date3": "7日後",
                "date4": "15日後",
                "date5": "30日後",
                'checkbox1': '1日後に復習しましたか?',
                'checkbox2': '2日後に復習しましたか?',
                'checkbox3': '7日後に復習しましたか?',
                'checkbox4': '15日後に復習しましたか?',
                'checkbox5': '30日後に復習しましたか?',
                'help_document': 'ドキュメントを表示するにはここをクリックしてください'
            },
        }
    },
    // 定义捷径的入参
    formItems: [
        {
            key: 'start_datetime',
            label: t('start_datetime'),
            component: block_basekit_server_api_1.FieldComponent.FieldSelect,
            props: {
                placeholder: t('placeholderStartDate'),
                supportType: [block_basekit_server_api_1.FieldType.DateTime],
            },
            validator: {
                required: true,
            },
            tooltips: [
                {
                    type: 'link',
                    text: t('help_document'),
                    'link': 'https://jfsq6znqku.feishu.cn/wiki/Bi9Jwpj9TibcNVk6982cmnZXnuf?from=from_copylink'
                }
            ],
        }
    ],
    // 定义捷径的返回结果类型
    resultType: {
        type: block_basekit_server_api_1.FieldType.Object,
        extra: {
            icon: {
                light: 'https://lf3-static.bytednsdoc.com/obj/eden-cn/abjayvoz/ljhwZthlaukjlkulzlp/2024H2/more/curve/Group%201321317637.png?',
            },
            properties: [
                {
                    key: 'create_time',
                    title: t('create_time'),
                    type: block_basekit_server_api_1.FieldType.Text,
                    isGroupByKey: true,
                    primary: true
                },
                {
                    key: 'date1',
                    title: t('date1'),
                    type: block_basekit_server_api_1.FieldType.DateTime
                },
                {
                    key: 'date2',
                    title: t('date2'),
                    type: block_basekit_server_api_1.FieldType.DateTime
                },
                {
                    key: 'date3',
                    title: t('date3'),
                    type: block_basekit_server_api_1.FieldType.DateTime
                },
                {
                    key: 'date4',
                    title: t('date4'),
                    type: block_basekit_server_api_1.FieldType.DateTime
                },
                {
                    key: 'date5',
                    title: t('date5'),
                    type: block_basekit_server_api_1.FieldType.DateTime
                },
            ],
        },
    },
    execute: async (formItemParams, context) => {
        const { start_datetime } = formItemParams;
        // 准备用于 'x-www-form-urlencoded' 的数据格式
        const params = new URLSearchParams();
        params.append('start_timestamp', String(start_datetime));
        try {
            const res = await context.fetch(`https://ebbinghaus-wuyi.replit.app/generate_schedule`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                },
                body: params
            }).then(res => res.json());
            let returnData = {};
            Object.entries(res.review_times).forEach(([count, ts], index) => {
                returnData[`date${index + 1}`] = ts;
            });
            returnData['create_time'] = res.create_time;
            return {
                code: block_basekit_server_api_1.FieldCode.Success,
                data: returnData
            };
        }
        catch (e) {
            return {
                code: block_basekit_server_api_1.FieldCode.Error,
            };
        }
    },
});
exports.default = block_basekit_server_api_1.basekit;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvaW5kZXgudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSxtRkFBZ0o7QUFDaEosTUFBTSxFQUFFLENBQUMsRUFBRSxHQUFHLGdDQUFLLENBQUM7QUFFcEIsMkJBQTJCO0FBQzNCLGtDQUFPLENBQUMsYUFBYSxDQUFDLENBQUMsWUFBWSxDQUFDLENBQUMsQ0FBQztBQUV0QyxrQ0FBTyxDQUFDLFFBQVEsQ0FBQztJQUNmLGdCQUFnQjtJQUNoQixJQUFJLEVBQUU7UUFDSixRQUFRLEVBQUU7WUFDUixPQUFPLEVBQUU7Z0JBQ0wsYUFBYSxFQUFFLE1BQU07Z0JBQ3JCLGdCQUFnQixFQUFFLE1BQU07Z0JBQ3hCLHNCQUFzQixFQUFFLFFBQVE7Z0JBQ2hDLE9BQU8sRUFBRSxNQUFNO2dCQUNmLE9BQU8sRUFBRSxNQUFNO2dCQUNmLE9BQU8sRUFBRSxNQUFNO2dCQUNmLE9BQU8sRUFBRSxPQUFPO2dCQUNoQixPQUFPLEVBQUUsT0FBTztnQkFDaEIsV0FBVyxFQUFFLFVBQVU7Z0JBQ3ZCLFdBQVcsRUFBRSxVQUFVO2dCQUN2QixXQUFXLEVBQUUsVUFBVTtnQkFDdkIsV0FBVyxFQUFFLFdBQVc7Z0JBQ3hCLFdBQVcsRUFBRSxXQUFXO2dCQUN4QixlQUFlLEVBQUUsVUFBVTthQUM5QjtZQUNELE9BQU8sRUFBRTtnQkFDTCxhQUFhLEVBQUUsZUFBZTtnQkFDOUIsZ0JBQWdCLEVBQUUsWUFBWTtnQkFDOUIsc0JBQXNCLEVBQUUsbUJBQW1CO2dCQUMzQyxPQUFPLEVBQUUsYUFBYTtnQkFDdEIsT0FBTyxFQUFFLGNBQWM7Z0JBQ3ZCLE9BQU8sRUFBRSxjQUFjO2dCQUN2QixPQUFPLEVBQUUsZUFBZTtnQkFDeEIsT0FBTyxFQUFFLGVBQWU7Z0JBQ3hCLFdBQVcsRUFBRSw2QkFBNkI7Z0JBQzFDLFdBQVcsRUFBRSw4QkFBOEI7Z0JBQzNDLFdBQVcsRUFBRSw4QkFBOEI7Z0JBQzND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
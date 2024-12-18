import { basekit, FieldType, field, FieldComponent, FieldCode, NumberFormatter, AuthorizationType } from '@lark-opdev/block-basekit-server-api';
const { t } = field;

// 通过addDomainList添加请求接口的域名
basekit.addDomainList(['replit.app']);

basekit.addField({
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
      component: FieldComponent.FieldSelect,
      props: {
        placeholder: t('placeholderStartDate'),
        supportType: [FieldType.DateTime],

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
    type: FieldType.Object,
    extra: {
      icon: {
        light: 'https://lf3-static.bytednsdoc.com/obj/eden-cn/abjayvoz/ljhwZthlaukjlkulzlp/2024H2/more/curve/Group%201321317637.png?',
      },
      properties: [
        {
          key:'create_time',
          title: t('create_time'),
          type: FieldType.Text,
          isGroupByKey:true,
          primary:true
        },
        {
          key: 'date1',
          title: t('date1'),
          type: FieldType.DateTime
        },
        {
          key: 'date2',
          title: t('date2'),
          type: FieldType.DateTime
        },
        {
          key: 'date3',
          title: t('date3'),
          type: FieldType.DateTime
        },
        {
          key: 'date4',
          title: t('date4'),
          type: FieldType.DateTime
        },
        {
          key: 'date5',
          title: t('date5'),
          type: FieldType.DateTime
        },
      ],
    },
  },
  execute: async (formItemParams: { start_datetime: any}, context) => {
    const { start_datetime } = formItemParams;

    // 准备用于 'x-www-form-urlencoded' 的数据格式
    const params = new URLSearchParams();
    params.append('start_timestamp', String(start_datetime));
    try {
      const res = await context.fetch(`https://ebbinghaus-wuyi.replit.app/generate_schedule`, { // 已经在addDomainList中添加为白名单的请求
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
      returnData['create_time'] = res.create_time


      return {
        code: FieldCode.Success,
        data: returnData
      }
    } catch (e) {
      return {
        code: FieldCode.Error,
      }
    }
  },
});
export default basekit;
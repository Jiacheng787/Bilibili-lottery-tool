# Bilibili lottery tool

🔥 Bilibili 动态评论抽奖工具，使用 Node.js 技术栈，支持对评论区用户进行抽奖，可以指定中奖用户数

使用示例如下：

```js
const Lottery = require("./Lottery");

let lottery = new Lottery();
lottery
  .setDynamicId("526817746483513832")
  .setOid("135311662")
  .setNum(2)
  .getLuckyUsers();
```

控制台输出如下内容：

![image-20210520211906087](D:\项目仓库\crawler\README.assets\image-20210520211906087.png)

## 参数说明

1. `dynamicId` (String): 动态的 dynamicId，必填；
2. `oid` (String): 动态对应评论的 oid，必填；
3. `num` (Number): 中奖用户数，可选，默认为1；

> dynamicId 大于 2^53，超出 Number 类型可以精确表示的范围，因此使用字符串



## 如何获取动态的 dynamicId 和 oid 参数

打开需要抽奖的评论详情，在浏览器的地址栏可以看到当前页面的 URL ，后面的 path 参数即为 `dynamicId` ：

![image-20210520212921872](D:\项目仓库\crawler\README.assets\image-20210520212921872.png)

然后按 `F12` 打开浏览器调试工具，选择 `Network` 面板，选中 `JS` ，然后刷新页面，会看到一个 `main?callback` 的网络请求，点开详情，在 `RequestURL` 中可以看到 `oid` 参数：

![image-20210520213331194](D:\项目仓库\crawler\README.assets\image-20210520213331194.png)



## 补充说明

1. 现在只支持对评论区用户进行抽奖，但实际上大多数场景都要求转发、评论、关注的用户才能抽奖，因此后续将完善这一功能。

2. 另外项目中现在用到了两个接口：

   ```
   # 获取动态详情
   https://api.vc.bilibili.com/dynamic_svr/v1/dynamic_svr/get_dynamic_detail
   # 获取评论详情
   https://api.bilibili.com/x/v2/reply/main
   ```

   如果在使用过程中发现接口失效了，请及时告知本人。


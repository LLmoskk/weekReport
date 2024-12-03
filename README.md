# weekReport
根据 commit 信息生成周报
复制 weekReport.js 到项目根目录下,修改 `GITAUTHOR(git用户名)` `TOTALDAYS(需要拉取的天数)` `COMMIT_TYPES(commit 提交的类型)` 三个变量,然后
```bash
node weekReport.js
```
拿生成的 commit_messages.txt 文件内容咨询 ai，让他优化描述并去除 fix feat 等前缀描述

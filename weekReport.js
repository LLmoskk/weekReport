const fs = require('fs');
const path = require('path');
const { exec } = require('child_process');

let allLogs = [];

const GITAUTHOR = ''; //git显示的用户名，用于分离出自己的提交记录
const TOTALDAYS = 7; //拉取git的最近n天的提交记录
const COMMIT_TYPES = ['feat', 'fix', 'chore', 'doc', 'docs', 'refactor']; // 需要提取的 commit 类型

// 获取当前工作目录
const currentDir = process.cwd();

// 构建 git log 命令，使用 --since 参数限制日期范围，格式为 "n days ago"
const gitLogCommand = `git log --author="${GITAUTHOR}" --since="${TOTALDAYS} days ago" --pretty=format:"%s"`;

// 执行 git log 命令
exec(gitLogCommand, { cwd: currentDir }, (error, stdout, stderr) => {
  if (error) {
    console.error(`Error executing git log: ${error.message}`);
    return;
  }

  if (stderr) {
    console.error(`stderr: ${stderr}`);
    return;
  }

  // 将获取到的提交消息按行分割
  const commitMessages = stdout.trim().split('\n');

  // 过滤出符合 commit 类型的提交信息
  allLogs = commitMessages.filter((message) => {
    return COMMIT_TYPES.some((type) => message.startsWith(type)); // 检查提交消息是否以指定类型开头
  });

  // 输出所有提交消息
  console.log('Recent commits by user', GITAUTHOR, 'in the last', TOTALDAYS, 'days:');
  allLogs.forEach((log, index) => {
    console.log(`${index + 1}. ${log}`);
  });

  // 可选：将结果保存到文件中（如果需要）
  fs.writeFile(path.join(currentDir, 'commit_messages.txt'), allLogs.join('\n'), (err) => {
    if (err) {
      console.error('Failed to write commit messages to file:', err);
    } else {
      console.log('Commit messages saved to commit_messages.txt');
    }
  });
});

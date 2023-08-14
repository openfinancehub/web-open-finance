# Web Open Finance （金融平权 web 端）

该项目由 `@umijs/max` 模板项目，更多功能参考 [Umi Max 简介](https://umijs.org/docs/max/introduce) 提供技术支持

这份说明将为你展示所用工具以及运行环境、代码规范等，请认真阅读

## 🔨 运行环境

- node >= 14.13.1
- typescript >= 3.0
- yarn >= 1.14.0 or npm >= 6.7.0
- git >= 2.10.1

## 🔧 开发环境

- [VS Code](https://code.visualstudio.com/)
- [Chrome](https://www.google.com/chrome/)
- [React Developer Tools](https://chrome.google.com/webstore/detail/react-developer-tools/fmkadmapgofadopljbjfkapdkoienihi?hl=en-US)
- [Redux DevTools](https://chrome.google.com/webstore/detail/redux-devtools/lmhkpmbekcpmknklioeibfkpmmfibljd?hl=en-US)
- [Node](https://nodejs.org/en/)
- [Typescript](https://github.com/Microsoft/TypeScript)
- [Mac 命令行工具](https://zhuanlan.zhihu.com/p/53380250)

## ✨ VSCode 插件推荐

- [GitLens](https://gitlens.amod.io)
- [Auto Close Tag](https://marketplace.visualstudio.com/items?itemName=formulahendry.auto-close-tag)
- [Auto Rename Tag](https://marketplace.visualstudio.com/items?itemName=formulahendry.auto-rename-tag)
- [ES7 React/Redux/GraphQL/React-Native snippets](https://marketplace.visualstudio.com/items?itemName=dsznajder.es7-react-js-snippets)
- [TSLint](https://marketplace.visualstudio.com/items?itemName=ms-vscode.vscode-typescript-tslint-plugin)
- [Path Autocomplete](https://marketplace.visualstudio.com/items?itemName=ionutvmi.path-autocomplete)
- [Bracket Pair Colorizer](https://marketplace.visualstudio.com/items?itemName=CoenraadS.bracket-pair-colorizer)
- [TODO Highlight](https://marketplace.visualstudio.com/items?itemName=wayou.vscode-todo-highlight)
- [Code Spell Checker](https://marketplace.visualstudio.com/items?itemName=streetsidesoftware.code-spell-checker)

## 👣 可运行的命令

在该项目目录下, 你可以运行以下命令:

`yarn install` or `npm install`

`yarn start` or `npm start`

以开发模式运行该项目然后打开 Chrome 浏览器访问[http://localhost:8000](http://localhost:8000).

`yarn start:pre` or `npm start:pre` 以预生产模式运行该项目

`yarn start:prod` or `npm start:prod` 以生产模式运行该项目

### 技术栈

[`React`](https://github.com/facebook/react)[UmiJs](https://umijs.org/zh-CN/docs) [`Typescript`](https://github.com/Microsoft/TypeScript) [`React Router`](https://github.com/ReactTraining/react-router) [`Redux`](https://github.com/reduxjs/redux) [`Ant Design`](https://github.com/ant-design/ant-design)[`Pro Component`](https://procomponents.ant.design/docs)[`Ant Design Pro`](https://pro.ant.design/zh-CN/) [`Jest`](https://github.com/facebook/jest) [`ECharts`](https://github.com/apache/incubator-echarts) [`Webpack`](https://github.com/webpack/webpack) [`Babel`](https://github.com/babel/babel) [`enzyme`](https://github.com/airbnb/enzyme)

### React Typescript 编写规范

[react-redux-typescript-guide](https://github.com/piotrwitek/react-redux-typescript-guide)

## 🌿Git 分支管理说明

```Git
git-flow 是目前流传最广的 Git 分支管理实践。git-flow 围绕的核心概念是版本发布（release)
git-flow 流程中包含 5 类分支，分别是 master、develop、新功能分支（feature）、发布分支（release）和 hotfix
```

### 相关分支说明

| 分支类型 | 命名规范   | 创建自             | 合并到             | 说明                               |
| -------- | ---------- | ------------------ | ------------------ | ---------------------------------- |
| master   | master     |                    |                    | 开发主分支                         |
| feature  | feature/\* | master             | master             | 新功能                             |
| staging  | staging/\* | develop            | release 和 master  | 稳定测试版本发布                   |
| release  | release/\* | staging            | develop 和 master  | 新版本发布                         |
| hotfix   | hotfix/\*  | staging 或 release | release 和 staging | staging 或 release 中 bug 修复分支 |
| bugfix   | bugfix/\*  | master             | master             | master 中 bug 修复分支             |

1. `master`为开发分支, 是一个进行代码集成的分支, 该分支会及时合并最新代码, 新需求的开发都从此分支上创建
2. `feature/my-awesome-feature` 为新功能分支, 开发新需求时, 需从`master`分支创建
3. `hotfix/fix-my-bug` 为热修复 bug 分支, 主要是针对`release`或`staging`分支测试出现的 bug 进行修复
4. `release/0.0.1`分支为部署到持续集成服务器上进行测试的分支, 是一个相对稳定的可供测试的分支
5. `staging` 是部署到测试(预生产)环境中的代码, 一般不允许随意合并其他分支到此分支上
6. `bugfix/fix-my-bug` 为主分支修复 bug 分支, 主要是针对`master`或`feature`分支测试出现的 bug 进行修复

### `feature`分支创建流程

1. 从 `master`分支创建一个新的`feature`分支, 如`feature/my-awesome-feature`
2. 在该`feature`分支上进行开发相关需求，完成后提交代码并 push 到远端仓库
3. 当代码完成之后，提`pull request`, 代码审核通过后合并到`master`分支, 之后可删除当前`feature`分支

### `bugfix`分支创建流程

1. 从`master`分支创建一个新的`bugfix`分支，如 `bugfix/fix-my-bug`
2. 进行相关的 bug 修复并在本地测试通过
3. 当 bug 修复之后，提`pull request`, 合并`bugfix/fix-my-bug`分支到`master`分支

### `hotfix`分支创建流程

1. 从`master`分支创建一个新的`staging`分支，如 `staging/0.0.1`
2. 把`staging`分支部署到持续集成服务器上, 并交给相关测试人员进行测试
3. 对于测试中发现的问题，直接在`staging`分支上创建`hotfix/fix-my-bug`分支, 进行相关的 bug 修复
4. 当 bug 修复之后，提`pull request`, 合并`hotfix/fix-bug`分支到`staging`分支, 再次部署并交给测试人员进行测试

### `staging`分支创建流程

1. 从`master`分支创建一个新的`staging`分支，如 `staging/0.0.1`
2. 把`staging`分支部署到持续集成服务器上, 并交给相关测试人员进行测试

### `release`分支创建流程

1. 从`staging`分支创建一个新的`release`分支, 如 `release/0.0.1`
2. 把`release`分支推到远端, 部署到持续集成服务器上线

### 代码提交说明

使用 commitizen 自动生成合格的 commit message，编写 message 时需要加上 type 前缀
type 用于说明 commit 的类别，只允许使用下面 7 个标识

```git
1. feat：新功能（feature）
2. fix：修补 bug
3. docs：文档（documentation）
4. style： 格式（不影响代码运行的变动）
5. refactor：重构（即不是新增功能，也不是修改 bug 的代码变动）
6. test：增加测试
7. chore：构建过程或辅助工具的变动
```

[Commit message 和 Change log 编写指南](http://www.ruanyifeng.com/blog/2016/01/commit_message_change_log.html)

## Jest 测试

Jest 测试框架官方网站[Jest](https://jestjs.io/)

## 🔭 学习更多

想获取更多信息，可以访问[UmiJs](https://umijs.org/zh-CN/docs).

想学习更多 React 内容，可访问 React 官方网站 [React documentation](https://reactjs.org/).

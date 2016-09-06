# Android 开发规范

## 操作系统规范
* 禁止使用windows系统
* 可以使用linux系统
* 推荐使用Mac系统
* 设置UTF-8作为系统默认字符集

## 开发工具规范
### IDE
* 禁止使用eclipse
* 可以使用intellij idea
* 推荐使用Android studio
* 设置UTF-8作为IDE默认字符集
### 版本控制
* git
### 构建工具
* 可以使用maven
* 推荐使用gradle
### 接口工具
* Charles
### JDK
* 根据产品需求确定统一的JDK
### ADK
* 根据产品需求确定统一的ADK
### NDK
* 根据产品需求确定统一的NDK

## 工程结构规范(以git+gradle控制构建下的结构为例)
### 单主工程结构
* 根目录
* |--src/main/
* &nbsp;&nbsp;&nbsp;&nbsp;|--java/
* &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;|--package name/
* &nbsp;&nbsp;&nbsp;&nbsp;|--assets/
* &nbsp;&nbsp;&nbsp;&nbsp;|--res/
* &nbsp;&nbsp;&nbsp;&nbsp;|--aidl/
* &nbsp;&nbsp;&nbsp;&nbsp;|--jni/
* &nbsp;&nbsp;&nbsp;&nbsp;|--jniLibs/
* &nbsp;&nbsp;&nbsp;&nbsp;|--AndroidManifest.xml
* &nbsp;&nbsp;&nbsp;&nbsp;|--resources/
* |--src/androidTest/
* &nbsp;&nbsp;&nbsp;&nbsp;|--java/
* &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;|--package name/
* &nbsp;&nbsp;&nbsp;&nbsp;|--resources/
* |--.gitignore
* |--README.md
* |--build.gradle
* |--settings.gradle
* |--key.jks
* |--License or copyright
### 单库工程结构
* 根目录
* |--lib+命名
* &nbsp;&nbsp;&nbsp;&nbsp;|--子目录同单主工程结构根目录下的结构
* &nbsp;&nbsp;&nbsp;&nbsp;|--构建配置文件酌情增减
* |--demo+命名
* &nbsp;&nbsp;&nbsp;&nbsp;|--子目录同单主工程结构根目录下的结构
* &nbsp;&nbsp;&nbsp;&nbsp;|--构建配置文件酌情增减
### 多主工程结构(差异化构建)
* 根目录
* |--src/
* &nbsp;&nbsp;&nbsp;&nbsp;|--差异化1
* &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;|--子目录可以看做是单主工程结构
* &nbsp;&nbsp;&nbsp;&nbsp;|--差异化2
* &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;|--子目录可以看做是单主工程结构
* &nbsp;&nbsp;&nbsp;&nbsp;|--差异化N
* &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;|--子目录可以看做是单主工程结构
* |--License or copyright
### 多库工程结构
原则上不允许多库工程结构,多库工程结构可以看做是单库结构的组合.
## 分包规范
* 分包以功能为主线
* 禁止出现按照view + adapter + network之类的分包方式
## 文件命名规范
### 包命名
* 倒置公司域名+产品标识+差异化(如果单一可以省略)
### java文件命名
* 遵循标准的java文件命名方式
* 首字母大写的驼峰命名
* interface文件以字母I开始
* Abstract文件以字母A开始
* enum以字母E开始
* 实体类以Entity结束
* 服务类以Service结束
* 适配器类以Adapter结束
* 控制器类以Activity结束
* Fragment类以Fragment结束
* View类以View结束
* 未声明的组件同上
* java文件命名禁止使用下划线
* 原则上每个单词不应超过7个字母
* 原则上每个文件名称不应超过5个单词
### 图片命名(本规则也适用于xml类型的图片)
* 图片文件的命名要起始包含五个字符以内的尽可能独立的标记如(tencent:tenct_,alibaba:ali_,retechcorp:retech_),特别是用在库工程中.
* 图片文件的命名要包含用途的缩写如(Button:btn_,Action bar:ab_,Dialog:dlg_)
* 图片文件的状态命名要有相应的后缀如(_normal,_pressed,_focused,_disabled,_selected)
### 布局命名
* 布局文件的命名要起始包含五个字符以内的尽可能独立的标记如(tencent:tenct_,alibaba:ali_,retechcorp:retech_),特别是用在库工程中.
* 布局文件的命名要起始包含所在的java文件的标记如(UserProfileActivity:act_user_profile.xml,SignUpFragment:frag_sign_up.xml,AdapterView:item_person.xml
)
### 样式命名
* 样式的命名要起始包含五个字符以内的尽可能独立的标记如(tencent:tenct_,alibaba:ali_,retechcorp:retech_),特别是用在库工程中.
### values命名
* 字符串的命名要起始包含五个字符以内的尽可能独立的标记如(tencent:tenct_,alibaba:ali_,retechcorp:retech_),特别是用在库工程中.
## 文件编码规范
* UTF-8
## 代码风格规范(可以在IDE中导入https://raw.githubusercontent.com/google/styleguide/gh-pages/eclipse-java-google-style.xml)
* import 禁止使用通配符
* 静态import放到一个区域
* 非静态import要放到一个区域
* 静态import和非静态import使用一个空行分开
* 每个class都有自己的独立java文件
* 每个java文件的构造函数禁止被方法分割
* 每个方法的重载禁止被其他方法分割
* 禁止省略条件判断,循环的大括号(如if, else, for, do and while)
* 禁止在左大括号之前换行
* 禁止在左大括号之后换行
* 必须在右大括号之前换行
* 必须在右大括号之后换行(else,catch除外)
* 如果大括号中是空的,大括号必须是一行
* 代码块之间使用两个空行分割
* 每个声明占用一行
* 原则上每行代码不要超出100列(URL,import,command-line等不可分割的除外)
* 断句一般要发生在操作符之前(左小括号和for除外)
* 断句后一般要尽行4x缩进
* 必须要进行异常捕捉和处理
* 必须要进行分门别类的异常处理,禁止一个catch对应所有的exception
## 代码注释规范
* 应有的@Override必不能少
* 应用的@Deprecated必不能少
* 应有的@SuppressWarnings必不能少
* 有工作需要后续处理的必须添加TODO 以及说明
* 必须要有类注释
* 必须要有方法注释
* 严格区分行注释,块注释
* 注释和代码之间必须仅有一个换行符
* 类注释必须注明创建者
* 方法注释必须注明创建者和实现者
* 代码的修改必须注明修改者
## 代码调试规范
* 输出到控制台禁止使用System.out.
## 代码审核规范
* 代码审核必须按照该规范执行
## 发布规范
* 必须发布javadoc
* 发布测试包的文件名称必须snapshot结尾
* 发布包的文件名称必须有版本号和打包时间戳
* 发布时候必须生成javadoc
## 更多参考资料
* http://tools.android.com/tech-docs/new-build-system/user-guide
* https://google.github.io/styleguide/javaguide.html
* https://source.android.com/source/code-style.html
* https://material.google.com/style/icons.html
* https://github.com/google/styleguide
* https://github.com/ribot/android-guidelines/blob/master/architecture_guidelines/android_architecture.md

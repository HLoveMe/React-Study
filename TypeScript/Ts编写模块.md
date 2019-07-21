* 初始化

	```
	npm init -y
	
	npm i -D react-native@0.55.1 react@16.3.1
	
	npm i -g typescript  types
	
	npm i -D @types/react-native @types/react
	
	```
	
* package.json

	```
	{
	    "name": "react-native-widgets",
	    "version": "1.0.4",
	    "description": "",
	    "main": "./dist/index.js", //指向ts编译完成的入口文件
	    "scripts": {},
	    "keywords": [],
	    "author": "",
	    "license": "ISC",
	    "devDependencies": { //开发依赖
	        "@types/react": "^16.8.23",
	        "@types/react-native": "^0.60.2",
	        "react": "^16.3.1",
	        "react-native": "^0.55.1",
	        "typescript": "^3.5.3"
	    },
	    "dependencies": { //运行依赖
	    
	    },
	    "peerDependencies": { //
	        "react": ">=16.3.1",
	        "react-native": ">=0.55.1"
	    }
	}
	```
	
* 初始化ts

	```
	创建tsconfig.json
	{
	  "compilerOptions": {
	      "target": "es6", //你编写文件模块类型
	      "allowJs": true,
	      "jsx": "react",
	      "outDir": "./dist", //时时编译输入文件目录
	      "sourceMap": false,
	      "noImplicitAny": false,
	      "module": "es2015", //输出文件模式 'none', 'commonjs', 'amd', 'system', 'umd', 'es2015' "es6"
	      "watch": true,
	      "types": [
	          "react","react-native"
	      ],
	      "skipLibCheck": true,
	      "moduleResolution":"node"
	  },
	  "include": [
	      "typings/**/*.d.ts",
	      "src/**/*.ts",
	      "src/**/*.tsx",
	      "*.tsx"
	  ],
	  "exclude": [
	      "node_modules"
	  ], 
	}
	```
	
* 编译

	```
	tsc 
	```
	
* 创建声明文件

	```
	index.d.ts
	```
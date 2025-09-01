export interface BuildInfo {
  version: string;
  commitTime: Date;
  commitHash: string;
  commitLink: string;
  buildTime: Date;
}

// 为 system-info.json 文件声明模块类型
declare module "@web/assets/system-info.json" {
  const buildInfo: BuildInfo;
  export default buildInfo;
}

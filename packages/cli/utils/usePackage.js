import AppDirectory from "appdirectory"
import path from "path";
import fs from "fs"
const dirs = new AppDirectory({appName: "gen-codes"})
export default function usePackage(dir){
  let genFile
  let modules
  if(!dir){
    dir = process.cwd()
  }
  if(fs.existsSync(path.join(dir, ".gen/gen.module.json"))) {
    genFile =  path.join(dir, ".gen/gen.module.json")
    modules = path.join(dir, ".gen/gen_modules")
  } else if(fs.existsSync(path.join(dir, "gen.module.json"))) {
    genFile =  path.join(dir, "gen.module.json")
    if(dir.endsWith(".gen")){
      modules = path.join(dir, "gen_modules")
    }else{
      modules = path.join(dirs.userCache() ,"gen_modules")
    }
  } else if(path.dirname(dir) !== dir){
      const packageConfig =  usePackage(
        path.dirname(dir)
      )
      genFile = packageConfig.genFile
      modules = packageConfig.modules

  }else {
    genFile = path.join(dirs.userCache(), "gen.module.json")
    modules = path.join(dirs.userCache(),"gen_modules")
    if(!fs.existsSync(genFile)){
      fs.writeFileSync(genFile, '{"dependencies": []}')
    }
  }
  if(!fs.existsSync(modules)){
    fs.mkdirSync(modules)
  }
  return {
    genFile, modules
  }
}
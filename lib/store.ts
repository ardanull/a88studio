 import fs from 'fs'
 import path from 'path'
 
 function dataDir() {
   const dir = path.join(process.cwd(), 'data')
   if (!fs.existsSync(dir)) fs.mkdirSync(dir)
   return dir
 }
 
 function filePath(name: string) {
   return path.join(dataDir(), name)
 }
 
 export function readJson<T>(name: string, fallback: T): T {
   const fp = filePath(name)
   if (!fs.existsSync(fp)) return fallback
   try {
     const raw = fs.readFileSync(fp, 'utf-8')
     return JSON.parse(raw) as T
   } catch {
     return fallback
   }
 }
 
 export function writeJson<T>(name: string, data: T) {
   const fp = filePath(name)
   fs.writeFileSync(fp, JSON.stringify(data, null, 2), 'utf-8')
 }

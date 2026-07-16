import path from "path"
import multer from "multer"
import { fileURLToPath } from "url"

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const storage = multer.diskStorage({    //va vonfigurer où et sous quel nom multer sauvegarde le fichier
     destination:(req,file,cb)=>{    //cb = callback , une fonction donnée par multer qu'on doit appeler pour présenter le résultat, le format : cb(error,result)
        cb(null,path.join(__dirname,"..","uploads"))    //sauvegarde le fichier dans le dossier uploads 
     },
     filename:(req,file,cb)=>{    //partie qui consiste à donner un nom unique au fichier 
const uniqueSuffix = Date.now() + "-" + + Math.round(Math.random() * 1e9);
     cb(null,uniqueSuffix+path.extname(file.originalname))        //path.extname extrait l'extension du nom du fichier original
 }  //file.originalname est le nom du fichier qui était sur l'ordi de l'utilistaeur avant l'upload
 })

 const upload = multer({storage})

 export default upload 
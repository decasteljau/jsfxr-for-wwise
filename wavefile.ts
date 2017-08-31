import {ipcMain, app} from 'electron';
import * as path from 'path';
import * as fs from 'fs-extra'
import * as autobahn from 'autobahn';

function fnv32a( str:string ) :number
{
	var FNV1_32A_INIT = 0x811c9dc5;
	var hval = FNV1_32A_INIT;
	for ( var i = 0; i < str.length; ++i )
	{
		hval ^= str.charCodeAt(i);
		hval += (hval << 1) + (hval << 4) + (hval << 7) + (hval << 8) + (hval << 24);
	}
	return hval >>> 0;
}

// export interface WriteWaveFileArg {
//     filename: string;
//     data: string;
// }

const tempDir = path.join(app.getPath('temp'),'WwiseLauncher', 'Sfxr');


function writeWaveFile(filename, data) {
    fs.ensureDirSync(tempDir);
    
    let writePath = path.join(tempDir, filename + '_' + fnv32a(data.dataURI) + '.wav');
    if(fs.existsSync(writePath))
        fs.unlinkSync(writePath);

    ;

    fs.writeFileSync(writePath, new Buffer(data.wav));

    // Connect to waapi through autobahn
    let connection = new autobahn.Connection({
        url: 'ws://localhost:8080/waapi',
        realm: 'realm1',
        protocols: ['wamp.2.json']
    });

    connection.onopen = function(session) {
        let importArgs = {
            importOperation: "createNew",
            default: {},
            imports: [{
                importLanguage: "SFX",
                audioFile: writePath,
                objectPath: "\\Actor-Mixer Hierarchy\\Default Work Unit\\<Sound SFX>" + filename + '_00'
            }] 
        };

        // Use waapi to import file by absolute path
        session.call('ak.wwise.core.audio.import', [], importArgs).then(
            (result) => {
                console.info("Successfully imported SFX into Wwise!");
                connection.close();
            },
            (error) => {
                console.error(`An error occurred while importing the SFX into Wwise: ${JSON.stringify(error,null,4)}`);
                connection.close();
            }
        );
    };

    connection.onclose = function (reason, details): boolean {
        return true;
    };    
    connection.open();

}

export function init() {
    
    ipcMain.on('send-to-wwise', (event, args) => {
        setTimeout(()=>{
            writeWaveFile(args.filename, args.data);
        });
        
    });
}

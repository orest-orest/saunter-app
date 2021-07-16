import firebase from "firebase";

const ref = async () => {
    return firebase.database().ref()
}

const refPath = () => firebase.database().ref('listOfPath')


const firebaseConfig = {
    apiKey: "AIzaSyDohG1kfHLVrzliksUrPh1Q0V7WBJMajT8",
    authDomain: "quiet-notch-319616.firebaseapp.com",
    projectId: "quiet-notch-319616",
    storageBucket: "quiet-notch-319616.appspot.com",
    messagingSenderId: "802850026142",
    appId: "1:802850026142:web:2a3d1c0adf7eafcce2c18f"
};


export class Fire {

    constructor() {
        this._init()
    }

    _init = () => {
        if (!firebase.apps.length) {
            firebase.initializeApp(firebaseConfig)

        }
        console.log('Successfully inited');
    }

    setBackupPath = async (path) => {
        try {
            await(await ref(path))
                .set(path);
            return await this.getOnce(path)
        }  catch (error) {
            console.log(error)
        }
    }

    getOnce = async path => {
        try {
            const snapshot = await (await ref(path)).once('value')
            if (snapshot.hasChildren()) {
            }
        } catch (error) {
        }

    }


}


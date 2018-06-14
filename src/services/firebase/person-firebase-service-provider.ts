import { Injectable } from '@angular/core';

import { AngularFirestore } from 'angularfire2/firestore';
import { Observable } from 'rxjs/Observable';
import { PersonModel } from '../../models';
@Injectable()
export class PersonFirebaseServiceProvider {
    // https://www.youtube.com/watch?v=-GjF9pSeFTs

    // users
    // Category
    // Person,

    constructor(private db: AngularFirestore) { }

    public insertRecord(personModel: PersonModel, callbackMethod) {
        this.db.collection('person').doc(personModel.guidId).set(personModel).then((docRef) => {
            // console.log(docRef);
            callbackMethod({ success: true, data: undefined });
        }).catch((error) => {
            // console.log(error);
            callbackMethod({ success: false, data: undefined });
        });
    }

    public getRecord(guidId, callbackMethod) {
        let docRef = this.db.doc('person/' + guidId);
        let valueChangesSub = docRef.valueChanges();

        let subscription = valueChangesSub.subscribe((res) => {
            callbackMethod({ success: true, data: res });
            subscription.unsubscribe();
        }, (err) => {
            callbackMethod({ success: false, data: err });
            subscription.unsubscribe();
        });
    }

    public getAll(callbackMethod) {
        // let collectionRef = this.db.collection('person', (ref) => {
        //     return ref.where('shareToken', '==', localStorage.getItem('shareToken')).orderBy('recordDate');
        // });
        let collectionRef = this.db.collection('person');
        // var notes = categoryCollectionRef.valueChanges();
        let snapshot = collectionRef.snapshotChanges()
            .map((changes) => {
                return changes.map((snap) => {
                    return snap.payload.doc.data() as PersonModel;
                });
            });
        let subscription = snapshot.subscribe((res) => {
            callbackMethod({ success: true, data: res });
        }, (err) => {
            callbackMethod({ success: false, data: err });
        });
    }

    public updateRecord(personModel: PersonModel, callbackMethod) {
        let docRef = this.db.doc('person/' + personModel.guidId);
        docRef.set(personModel).then((ok) => {
            callbackMethod({ success: true, data: ok });
        }).catch((err) => {
            callbackMethod({ success: false, data: err });
        });
    }

    public deleteRecord(guidId, callbackMethod) {
        let docRef = this.db.doc('person/' + guidId);
        docRef.delete().then((ok) => {
            callbackMethod({ success: true, data: ok });
        }).catch((err) => {
            callbackMethod({ success: false, data: err });
        });
    }

}

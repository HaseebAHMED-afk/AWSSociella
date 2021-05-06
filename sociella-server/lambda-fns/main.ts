import addDiary from './addDiary'
import deleteDiary from './deleteDiary'
import getDiaries from './getDiaries'

import Diary from './Diary'


type AppSyncEvent = {
    info:{
        fieldName: string
    },
    arguments:{
        diaryId: string,
        user: string,
        diary: Diary
    }
}

exports.handler = async ( event : AppSyncEvent ) =>{
    switch(event.info.fieldName){
        case 'addDiary':
            return await addDiary(event.arguments.diary)
        case 'deleteDiary':
            return await deleteDiary(event.arguments.diaryId)
        case 'getDiaries':
            return await getDiaries()
        default:
            return null
    }
}
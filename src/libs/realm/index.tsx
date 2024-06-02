import Realm from 'realm'

import { createRealmContext } from "@realm/react";

import { Historic } from "./schemas/Historic";

export const realmAccessBehavior: Realm.OpenRealmBehaviorConfiguration = {
    type: Realm.OpenRealmBehaviorType.OpenImmediately
}

export const syncConfig = {
    flexible: true,
    newRealmFileBehavior: realmAccessBehavior,
    existingFileBehavior: realmAccessBehavior
}

export const {
    RealmProvider,
    useRealm,
    useQuery,
    useObject
} = createRealmContext({
    schema: [Historic]
})
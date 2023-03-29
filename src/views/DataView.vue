<template>
    <div v-if="game" class="max-w-[900px] p-9 text-left m-auto">
        <pre>
            {{ game }}
        </pre>
        <pre>
            {{ users }}
        </pre>
        <pre>
            {{ enemies }}
        </pre>
        <pre>
            {{ classes }}
        </pre>
    </div>
</template>

<script>
import { computed, ref, watchEffect } from 'vue'
import { useRoute } from 'vue-router'
import { db } from '../firebase/config';
import { doc, onSnapshot } from '@firebase/firestore';
import getCollection from '@/utils/getCollection'

export default {
    name: "GameView",
    data() {
        return{
            searchData: null
        }
    },
    setup() {
        const route = useRoute()

        const gameId = computed(() => route.params.id)


        const collectionName = 'games'
        const game = ref(null)
        let docRef = doc(db, collectionName, gameId.value);
        const unsub = onSnapshot(docRef, (snapshot) => {
            game.value = snapshot.data()
        })
        watchEffect((onInvalidate) => {
            onInvalidate(() => {
                unsub()
            })
        })
        const { documents: classes } = getCollection('classes')
        const { documents: enemies } = getCollection('enemies')
        const { documents: users } = getCollection('users')


        return { game, classes, enemies, users }
    }
}
</script>
<template>
    <div v-if="game" class="max-w-[900px] p-9 text-left m-auto">
        <h1 class="mt-9 mb-12 text-6xl font-bold text-center">{{ game.id }}</h1>
        <div class="grid lg:grid-cols-3 sm:grid-cols-2 gap-4 p-9">
            <div v-for="card in game.players" :key="card.uuid" class="bg-slate-600/40 shadow-md border-slate-600 border rounded-lg p-2 transform hover:-translate-y-1 duration-300 hover:shadow-xl cursor-pointer">
                <div class="h-[200px] w-full rounded-t-lg bg-cover" :style="{ backgroundImage: 'url(' + require('@/assets/img/'+  card.class +'.jpg') + ')' }"></div>
                <h3 class="text-slate-200 font-bold">{{ card.name }}</h3>
                <div class="grid grid-cols-2 text-sm">
                    <span>HP</span><span class="text-right">{{ card.hp }}</span>
                    <span>MANA</span><span class="text-right">{{ card.mana }}</span>
                    <span>STM</span><span class="text-right">{{ card.stamina }}</span>
                </div>
            </div>
        </div>
        <div class="gap-4 grid mt-6">
            <div v-for="(card, i) in game.encounters" :key="i" class="bg-slate-600/40 rounded-lg p-6" :class="{'border-red-400 border-2': game.progress === i}">
                <div class="">
                    <div>{{ i }}</div>
                    <div>{{ card.description }}</div>
                </div>
                <div class="flex mt-9 gap-2">
                    <div v-for="(enemy,j) in card.enemies" :key="enemy+j" class="bg-red-600/40 rounded-lg p-2">
                        {{ enemy }}
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { computed, ref, watchEffect } from 'vue'
import { useRoute } from 'vue-router'
import { db } from '../firebase/config';
import { doc, onSnapshot } from '@firebase/firestore';

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
        return { game }
    }
}
</script>
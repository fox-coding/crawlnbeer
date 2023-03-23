<template>
    <div>
        <h1 class="mt-9 mb-12 text-6xl font-bold text-center">Create a new game</h1>
        <form @submit="handleSubmit" class="space-y-9 mb-44 p-2">

            <div class="bg-amber-400/80 p-9 max-w-[1000px] m-auto rounded-lg shadow-xl">
                <div class="space-y-6">
                    <h2 class="mb-6 font-bold text-amber-900 italic text-4xl">
                        Story
                    </h2>
                    <div>
                        <label for="id_input">Provide a game id/name:</label>
                        <input required type="text" v-model="gameId" id="id_input" placeholder="game ID">
                    </div>
                    <div>
                        <label for="description">Describe the story of your advanture:</label>
                        <textarea required class="h-44" v-model="gameDescription" type="text" id="description" placeholder="Story of your journey"></textarea>
                    </div>
                </div>
            </div>

            <div class="bg-green-400/80 p-9 max-w-[1000px] m-auto rounded-lg shadow-xl">
                <div class="space-y-6">
                    <h2 class="mb-6 font-bold text-green-900 italic text-4xl">
                        Players
                    </h2>                    
                    <div class="grid lg:grid-cols-2 items-end space-x-4 border-green-600 py-9" :class="{'border-b':players.length > 1}" v-for="(player,k) in players" :key="k">
                        <span class="grid lg:grid-cols-2 gap-4 mb-4 lg:mb-0">
                            <label for="player-name">
                                Player Name
                                <input required type="text" class="form-control" placeholder="Enter player name" v-model="player.name">
                            </label>
                            <label>Player class
                                <select @change="setStats(player.class,k)" required class="form-control" v-model="player.class">
                                    <option value="" disabled selected>Select player class</option>
                                    <option value="knight">Knight</option>
                                    <option value="monk">Monk</option>
                                    <option value="mage">Mage</option>
                                    <option value="inquisitor">Inquisitor</option>
                                    <option disabled value="berserk">Thunder-Berserk(coming out 25.03.2023)</option>
                                </select>
                            </label>
                        </span>
                        <span class="space-x-4 flex justify-center">
                            <button class="btn-secondary h-[44px]" @click.prevent="addPlayer(k)" v-show="k == players.length-1">Add another player</button>
                            <button class="btn-remove h-[44px]" @click.prevent="removePlayer(k)" v-show="k || ( !k && players.length > 1)">Remove player</button>
                        </span>
                    </div>
                </div>
            </div>


            <div class="bg-blue-400/80 p-9 max-w-[1000px] m-auto rounded-lg shadow-xl">
                <div class="space-y-6">
                    <h2 class="mb-6 font-bold text-blue-900 italic text-4xl">
                        Encounters
                    </h2>                  
                    <div class="grid items-end border-blue-500 py-9" :class="{'border-b':encounters.length > 1}" v-for="(encounter,k) in encounters" :key="k">
                        <div>
                            <span class="">
                                <label>
                                    Encounter description
                                    <textarea required class="h-44" v-model="encounter.description" type="text" id="description" placeholder="Story of your journey"></textarea>
                                </label>
                            </span>
                        </div>
                        <span class="mt-6 flex flex-col space-y-6">
                            <label>
                                Select location
                                <select required class="form-control" v-model="encounter.location">
                                    <option value="" disabled selected>Select a location</option>
                                    <option value="grassfield">Grassfield</option>
                                    <option value="grassfield-at-night">Grassfield at Night</option>
                                    <option value="forest">Forest</option>
                                    <option value="forest">Forest at Night</option>
                                    <option value="cave">Cave</option>
                                    <option value="lake">Lake</option>
                                    <option value="tower">Tower valley</option>
                                </select>
                            </label>

                            <label>
                                Fight action(optional)
                                <input type="text" placeholder="Enter fight action text, leave empty if there is no fight availible" v-model="encounter.decisions.fight">
                            </label>
                            <label>
                                Avoid action(optional)
                                <input type="text" placeholder="Enter fight action text, leave empty if there is no fight availible" v-model="encounter.decisions.avoid">
                            </label>
                            <label>
                                Move on action(optional)
                                <input type="text" placeholder="Enter fight action text, leave empty if there is no fight availible" v-model="encounter.decisions.moveon">
                            </label>
                            <label>
                                Add Enemies
                                <p v-if="encounter.enemies.length > 0" class="flex gap-2">
                                    Enemies so far: <span v-for="(enemy, i) in encounter.enemies" :key="i+enemy">{{ enemy }}</span>
                                </p>  
                                <div class="space-x-4">
                                    <button @click.prevent="pushEnemy('goblin',k)" class="btn-secondary !bg-green-400">goblin</button>
                                    <button @click.prevent="pushEnemy('bat',k)" class="btn-secondary !bg-indigo-500">bat</button>
                                    <button @click.prevent="pushEnemy('oger',k)" class="btn-secondary !bg-purple-500">oger</button>
                                    <button @click.prevent="resetEnemies(k)" class="btn-remove float-right">reset enemies</button>
                                </div>
                            </label>
                        </span>
                        <div class="space-x-4 mt-9">
                                <button class="btn-secondary m-0 h-[44px]" @click.prevent="addEncounter(k)" v-show="k == encounters.length-1">Add another encounter</button>
                                <button class="btn-remove m-0 h-[44px]" @click.prevent="removeEncounter(k)" v-show="k || ( !k && encounters.length > 1)">Remove encounter</button>
                        </div>
                    </div>
                </div>
            </div>
            <div class="mt-12 text-center">
                <button type="submit" class="btn-primary">Create game</button>

            </div>
        </form>
    </div>
</template>

<script>
import getCollection from '@/utils/getCollection'
import { db } from '../firebase/config';
import { addDoc, collection } from '@firebase/firestore';

import { ref } from 'vue'
import router from '@/router';
export default {
  name: 'CreateGameView',
  components: {
    
  },
  setup() {
    const { documents: classes } = getCollection('classes')
    const players = ref([{
        name: '',
        class: 'none',
        hp: 0,
        mana: 0,
        stamina: 0
    }])
    const gameId = ref()
    const gameDescription = ref()
    const encounters = ref([{
        description: '',
        debuff: {
            health:0,
            mana:0,
            stamina:0
        },
        buff:{
            health:0,
            mana:0,
            stamina:0
        },
        decisions:{
            avoid:'',
            fight:'',
            moveon:'',
        },
        enemies:[],
        location:''
    }])

    const addPlayer = () => {
        players.value.push({
        name: '',
        class: 'none',
        hp: 0,
        mana: 0,
        stamina: 0
      })
    }

    const removePlayer = (index) => {
        players.value.splice(index, 1)
    }

    const addEncounter = () => {
        encounters.value.push({
            description: '',
            debuff: {
                health:0,
                mana:0,
                stamina:0
            },
            buff:{
                health:0,
                mana:0,
                stamina:0
            },
            decisions:{
                avoid:'',
                fight:'',
                moveon:'',
            },
            enemies:[],
            location:''
        })
    }

    const removeEncounter = (index) => {
        encounters.value.splice(index, 1)
    }

    const pushEnemy = (enemy,i) => {
        encounters.value[i].enemies.push(enemy)
    }
    const resetEnemies = (i) => {
        encounters.value[i].enemies = []
    }

    const setStats = (playerClass,i) => {
        if(playerClass === 'mage'){
            players.value[i].hp = 180
            players.value[i].mana = 230
            players.value[i].stamina = 30
        }else if(playerClass === 'monk'){
            players.value[i].hp = 320
            players.value[i].mana = 50
            players.value[i].stamina = 100
        }else if(playerClass === 'knight'){
            players.value[i].hp = 250
            players.value[i].mana = 25
            players.value[i].stamina = 80
        }else if(playerClass === 'inquisitor'){
            players.value[i].hp = 100
            players.value[i].mana = 350
            players.value[i].stamina = 5
        }
    }


    const handleSubmit = async () => {
        const colRef = collection(db, 'games')
        await addDoc(colRef,{
            id: gameId.value,
            progress: 0,
            description: gameDescription.value,
            players: players.value,
            encounters: encounters.value
        }).then((docRef)=>{
            router.push('/game/'+docRef.id)
        })
    } 
    return {addPlayer,removePlayer,addEncounter,removeEncounter,pushEnemy,resetEnemies,handleSubmit,setStats,classes,players,encounters, gameId, gameDescription}
  }

}
</script>
<template>
    <div class="max-w-[1000px] m-auto">
        <h1 class="mt-9 mb-24 text-6xl font-bold text-center">Create a new game</h1>
        <form class="space-y-9">
            <div>
                <label for="id_input">Provide a game id(no special characters, no spaces):</label>
                <input type="text" id="id_input" placeholder="game ID">
            </div>
            <div>
                <label for="description">Describe the story of your advanture:</label>
                <textarea class="h-44" type="text" id="description" placeholder="Story of your journey"></textarea>
            </div>

            <div class="grid grid-cols-2 items-end space-x-4" v-for="(input,k) in players" :key="k">
                <span class="grid grid-cols-2 gap-4">
                    <label for="player-name">
                        Player Name
                        <input type="text" class="form-control" placeholder="Enter player name" v-model="input.name">
                    </label>
                    <label>Player class
                        <select type="text" class="form-control" v-model="input.class">
                            <option value="" disabled selected>Select player class</option>
                            <option value="knight">Knight</option>
                            <option value="monk">Monk</option>
                            <option value="mage">Mage</option>
                            <option value="inquisitor">Inquisitor</option>
                            <option disabled value="berserk">Thunder-Berserk(coming out 25.03.2023)</option>
                        </select>
                    </label>
                </span>
                <span class="space-x-4">
                    <button class="btn-remove h-[44px]" @click="remove(k)" v-show="k || ( !k && players.length > 1)">Remove player</button>
                    <button class="btn-secondary h-[44px]" @click="add(k)" v-show="k == players.length-1">Add another player</button>
                </span>
            </div>
        </form>
    </div>
</template>

<script>
import getCollection from '@/utils/getCollection'
import { ref } from 'vue'
export default {
  name: 'HomeView',
  components: {
    
  },
  setup() {
    const { documents: classes } = getCollection('classes')
    const players = ref([{
        name: '',
        class: ''
    }])
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

    const add = () => {
        players.value.push({
        name: '',
        party: ''
      })
    }

    const remove = (index) => {
        players.value.splice(index, 1)
    }
    
    return {add,remove,classes,players,encounters}
  }

}
</script>
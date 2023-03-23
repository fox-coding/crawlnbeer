<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <div>
    <div class="max-w-[1000px] m-auto">
        <h1 class="mt-9 text-6xl font-bold text-center">crawl & beer</h1>
        <p class="text-center text-2xl">Grab a beer and play your favorite dungeon crawler game!</p>
        <div class="">
            <h2 class="mt-44 mb-6 font-bold text-slate-900 italic text-4xl text-center lg:text-left">New classes now availible:</h2>
            <div class="grid lg:grid-cols-4 sm:grid-cols-2 gap-4 p-9">
                <div v-for="card in classes" :key="card.uuid" class="bg-slate-600/40 shadow-md border-slate-600 border rounded-lg p-2 transform hover:-translate-y-1 duration-300 hover:shadow-xl cursor-pointer">
                    <div class="bg-blue-300 h-[200px] w-full rounded-t-lg"></div>
                    <h3 class="text-slate-200 font-bold">{{ card.name }}</h3>
                    <div class="grid grid-cols-2 text-sm">
                        <span>HP</span><span class="text-right">{{ card.hp }}</span>
                        <span>MANA</span><span class="text-right">{{ card.mana }}</span>
                        <span>STM</span><span class="text-right">{{ card.stamina }}</span>
                    </div>
                </div>
            </div>
            <h2 class="mt-44 mb-6 font-bold text-slate-900 italic text-4xl text-center lg:text-left">Coming soon:</h2>
            <div class="md:flex">
              <div class="w-[200px] h-[200px]">
                <div class="bg-blue-300 w-[400px] h-[400px] rounded-full"></div>
              </div>
              <div class="p-12">
                <h3 class="text-2xl">The Thunder Berserk</h3>
                <p>Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.</p>
              </div>
            </div>
        </div>
    </div>
    <div class="w-full flex md:items-center justify-between bg-slate-600/40 my-64 p-24">
      <div class="max-w-[1000px] md:flex m-auto items-center">
          <div>
              <h2 class="mb-6 font-bold text-slate-900 italic text-4xl">
                Create a new game with your firends now!
              </h2>
              <p class="max-w-[600px]">You can create your own levels, and design a story. With unlimited options! Start by creating your own characters and then putting them into an intressting and dangerous fantasy setting! Defeat Goblins, Dragons and the Beast.</p>
            </div>
              <router-link class="btn-primary block md:flex mt-12 md:mt-0 md:ml-12 text-center" to="/create">Create your own game now</router-link>
        </div>
    </div>

  </div>
</template>

<script>
import getCollection from '@/utils/getCollection'
export default {
  name: 'HomeView',
  components: {
    
  },
  setup() {
    const { documents: classes } = getCollection('classes')
    
    return {
      classes
    }
  }
}
</script>
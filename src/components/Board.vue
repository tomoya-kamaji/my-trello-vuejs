<template>
  <div>
    <header>
      my Trello
    </header>
    <main>
      <p class="info-line">All: {{ totalCardCount }} tasks</p>
        <draggable 
          :list="lists"
          @end="movingList"
          class="list-index">
          <list
            v-for="(item, index) in lists"
            :key="item.id"
            :title="item.title"
            :cards="item.cards"
            :listIndex="index"
            @change="movingCard"
          />
          <list-add />
        </draggable>
    </main>
  </div>
</template>

<script>
// ★ここに追記
import draggable from 'vuedraggable'
import ListAdd from "./ListAdd";
import List from "./List";
import { mapState } from "vuex";

export default {
  components: {
    draggable,
    ListAdd,
    List,
  },

  computed: {
  // this.$store.state 
  // stateのlistsの値が変わる度にコンポーネントでcometedがlistsを返す仕組みが完成する
    ...mapState([
      "lists"
      ]),
    // ★ここに追記
    totalCardCount() {
      return this.$store.getters.totalCardCount
    }
  },
  methods: {
    movingCard: function() {
      this.$store.dispatch('updateList', { lists: this.lists })
    },
     // ★ここに追記
    movingList: function() {
      this.$store.dispatch('updateList', { lists: this.lists })
    }
  }
};
</script>

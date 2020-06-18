import {
  mapGetters,
  mapMutations,
  mapActions
} from 'vuex'

export const isLoveMixin = {
  data () {
    return {

    }
  },
  computed: {
    ...mapGetters(['lovelist'])
  },
  methods: {
    getIsLove (music) {
      let result = this.lovelist.findIndex(item => {
        return item.songmid == music.songmid
      })
      if (result == -1) {
        return false
      } else {
        return true
      }
    }
  }

}

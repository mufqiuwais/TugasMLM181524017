<template>
  <div class="list row">
    <div class="col-md-8">
      <div class="input-group mb-3">
        <input type="text" class="form-control" placeholder="Search by judul_berita"
          v-model="judul_berita"/>
        <div class="input-group-append">
          <button class="btn btn-outline-secondary" type="button"
            @click="searchJudul"
          >
            Search
          </button>
        </div>
      </div>
    </div>
    <div class="col-md-6">
      <h4>News List</h4>
      <ul class="list-group">
        <li class="list-group-item"
          :class="{ active: index == currentIndex }"
          v-for="(berita, index) in news"
          :key="index"
          @click="setActiveNews(berita, index)"
        >
          {{ berita.judul_berita }}
        </li>
      </ul>

      <button class="m-3 btn btn-sm btn-danger" @click="removeAllNews">
        Remove All
      </button>
    </div>
    <div class="col-md-6">
      <div v-if="currentNews">
        <h4>News</h4>
        <div>
          <label><strong>judul_berita:</strong></label> {{ currentNews.judul_berita }}
        </div>
        <div>
          <label><strong>konten:</strong></label> {{ currentNews.konten }}
        </div>
        <div>
          <label><strong>kategori:</strong></label> {{ currentNews.kategori }}
        </div>

        <a class="badge badge-warning"
          :href="'/news/' + currentNews.id"
        >
          Edit
        </a>
      </div>
      <div v-else>
        <br />
        <p>Please click on a News...</p>
      </div>
    </div>
  </div>
</template>

<script>
import NewsDataService from "../services/NewsDataService";

export default {
  name: "news-list",
  data() {
    return {
      news: [],
      currentNews: null,
      currentIndex: -1,
      judul_berita: ""
    };
  },
  methods: {
    retrieveNews() {
      NewsDataService.getAll()
        .then(response => {
          this.news = response.data;
          console.log(response.data);
        })
        .catch(e => {
          console.log(e);
        });
    },

    refreshList() {
      this.retrieveNews();
      this.currentNews = null;
      this.currentIndex = -1;
    },

    setActiveNews(berita, index) {
      this.currentNews = berita;
      this.currentIndex = index;
    },

    removeAllNews() {
      NewsDataService.deleteAll()
        .then(response => {
          console.log(response.data);
          this.refreshList();
        })
        .catch(e => {
          console.log(e);
        });
    },
    
    searchJudul() {
      NewsDataService.findByTitle(this.judul_berita)
        .then(response => {
          this.news = response.data;
          console.log(response.data);
        })
        .catch(e => {
          console.log(e);
        });
    }
  },
  mounted() {
    this.retrieveNews();
  }
};
</script>

<style>
.list {
  text-align: left;
  max-width: 750px;
  margin: auto;
}
</style>
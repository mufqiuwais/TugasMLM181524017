<template>
  <div class="submit-form">
    <div v-if="!submitted">
      <div class="form-group">
        <label for="judul_berita">judul_berita</label>
        <input
          type="text"
          class="form-control"
          id="judul_berita"
          required
          v-model="news.judul_berita"
          name="judul_berita"
        />
      </div>

      <div class="form-group">
        <label for="konten">Konten</label>
        <input
          class="form-control"
          id="konten"
          required
          v-model="news.konten"
          name="konten"
        />
      </div>

      <div class="form-group">
        <label for="kategori">Kategori</label>
        <input
          class="form-control"
          id="kategori"
          required
          v-model="news.kategori"
          name="kategori"
        />
      </div>

      <button @click="saveNews" class="btn btn-success">Submit</button>
    </div>

    <div v-else>
      <h4>You submitted successfully!</h4>
      <button class="btn btn-success" @click="newNews">Add</button>
    </div>
  </div>
</template>

<script>
import NewsDataService from "../services/NewsDataService";

export default {
  name: "add-news",
  data() {
    return {
      news: {
        id: null,
        judul_berita: "",
        konten: "",
        kategori: ""
      },
      submitted: false
    };
  },
  methods: {
    saveNews() {
      var data = {
        judul_berita: this.news.judul_berita,
        konten: this.news.konten,
        kategori: this.news.kategori
      };

      NewsDataService.create(data)
        .then(response => {
          this.news.id = response.data.id;
          console.log(response.data);
          this.submitted = true;
        })
        .catch(e => {
          console.log(e);
        });
    },
    
    newNews() {
      this.submitted = false;
      this.news = {};
    }
  }
};
</script>

<style>
.submit-form {
  max-width: 300px;
  margin: auto;
}
</style>
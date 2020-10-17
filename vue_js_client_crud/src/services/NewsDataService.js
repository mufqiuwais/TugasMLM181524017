import http from "../http-common";

class NewsDataService {
  getAll() {
    return http.get("/news");
  }

  get(id) {
    return http.get(`/news/${id}`);
  }

  create(data) {
    return http.post("/news", data);
  }

  update(id, data) {
    return http.put(`/news/${id}`, data);
  }

  delete(id) {
    return http.delete(`/news/${id}`);
  }

  deleteAll() {
    return http.delete(`/news`);
  }

  findByTitle(judul_berita) {
    return http.get(`/news?judul_berita=${judul_berita}`);
  }
}

export default new NewsDataService();
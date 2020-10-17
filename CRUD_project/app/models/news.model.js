module.exports = (sequelize, Sequelize) => {
    const News = sequelize.define("news", {
        judul_berita: {
            type: Sequelize.STRING
        },
        konten: {
            type: Sequelize.STRING
        },
        kategori: {
            type: Sequelize.STRING
        }
    });
  
    return News;
};
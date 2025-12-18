const pool = require("../config/db");


const getAllSongs = async(req, res) => {
    try{
        const result = await pool.query("SELECT * FROM songs");
        res.json(result.rows);

    }
    catch (err){
            res.status(500).json({ error: err.message });


    }

}

const recommendSongs = async(req, res) => {
    try{
        const {genre, artist, mood} = req.query;
        const result = await pool.query("SELECT * FROM songs");
        let songs = result.rows;

        songs = songs.map((song) => {
              let score = 0;
      if (genre && song.genre.toLowerCase() === genre.toLowerCase()) score += 3;
      if (mood && song.mood.toLowerCase() === mood.toLowerCase()) score += 2;
      if (artist && song.artist.toLowerCase() === artist.toLowerCase()) score += 1;

      return { ...song, score };
        })

         songs.sort((a, b) => b.score - a.score);

    res.json(songs.filter((s) => s.score > 0));
  } catch (error) {
       console.log(" ERROR IN recommendSongs:", error); 

    res.status(500).json({ error: error.message });

   }
    

}

const searchSongs = async(req, res) =>{
  try{
    const{query} = req.query;
     if (!query) {
      return res.status(400).json({ error: "Query parameter is required" });
    }
    const result = await pool.query(
      `SELECT * FROM songs
      WHERE LOWER(title) LIKE LOWER($1)
        OR LOWER(artist) LIKE LOWER($1)
        OR LOWER(genre)  LIKE LOWER($1) `,
        //  [`%${query}%`]
          [`%${query}%`] 

    )
    res.json(result.rows);
  }
  catch(err){
    res.status(500).json({error: err.message});
 }
};


const playSong = async(req,res) =>{
  try{
     const {id} = req.params;

     await pool.query(
      `UPDATE songs SET plays = plays + 1 WHERE id = $1`,
      [id]
     );

     const result = await pool.query(
      `SELECT * FROM songs WHERE id = $1`,
      [id]
     );

     res.json({
      message: "Song played successfully",
      song: result.rows[0]
     });
  }
  catch(err){
           console.error("Play song errror:", err);
          res.status(500).json({error: err.message});

  }
}









module.exports = {
  getAllSongs,
  recommendSongs,
  searchSongs,
  playSong
};
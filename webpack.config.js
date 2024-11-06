const path = require('path');

module.exports = {
  entry: './src/index.tsx',

  output: {
    path: path.resolve(__dirname, 'dist'), // Dossier de sortie
    filename: 'index.js', // Nom du fichier généré
    library: '@zodaf/react', // Nom de la bibliothèque
    libraryTarget: 'umd', // Format de la bibliothèque (Compatible avec CommonJS, AMD, et comme variable globale)
  },

  // Configuration des règles pour le traitement des fichiers
  module: {
    rules: [
        {
          test: /\.tsx?$/,
          use: 'ts-loader', // Ou 'babel-loader' si vous préférez Babel
          exclude: /node_modules/,
        },
      ],
  },

  // Résolution des extensions de fichiers
  resolve: {
    extensions: ['.js', '.jsx', '.ts', '.tsx'], // Extensions que Webpack peut résoudre automatiquement
  },

  // Configuration du mode
  mode: 'development', // Utilisez 'production' pour le build final
};

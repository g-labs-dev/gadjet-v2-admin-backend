import config from '@config';
import { Sequelize } from 'sequelize';
import fs from 'fs';

export const sequelize = new Sequelize({
  ...config.sequelize[config.env],
});

export const initModels = async () => {
  console.log('###### Sequelize Init Models.');

  const modelFolderDir = `${__dirname}/../models`;
  const modelFilenames = fs.readdirSync(modelFolderDir);
  const matchedModelFilenames = modelFilenames.filter(filename => isModelFilenameMatch(filename));

  const associates = matchedModelFilenames.map(filename => {
    const model = require(`${modelFolderDir}/${filename}`);
    return model.associate;
  });

  associates.forEach((associate, index) => {
    try {
      if (associate) associate();
    } catch (err) {
      const filename = matchedModelFilenames[index];
      console.log('######## Sequelize Associate Model Error: ', filename, err);
    }
  });
};

const isModelFilenameMatch = (filename: string): boolean => {
  const modelExt = config.env === 'development' ? 'ts' : 'js';
  const exceptions = ['.map'];
  return filename.endsWith(`.model.${modelExt}`) && !exceptions.some(exception => filename.includes(exception));
};

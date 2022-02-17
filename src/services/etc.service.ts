import Banks from '@models/Banks.model';

export const getBanks = () => {
  return Banks.findAll();
};

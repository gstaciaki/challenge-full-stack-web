type Page = {
  label: string;
  route: string;
};

const pageList: Page[] = [{ label: "Alunos", route: "/students" }];

export const useUtils = () => {
  const utils = {
    pageList,
  };

  return utils;
};

import { fromJS, Map } from 'immutable';

export function prepareProjectDetails(data: any): any {
  const projectData = fromJS(data);

  return Map({
    name: projectData.get('name', '-'),
    version: projectData.get('version', '-'),
  });
}

export function prepareData(packageJson: {
  dependencies?: any;
  devDependencies?: any;
}): any {
  const dependencies: any = Object.keys(packageJson.dependencies).map(function(
    key
  ) {
    return {
      name: key,
      requiredVersion: packageJson.dependencies[key],
      isDependency: true,
    };
  });

  const devDependencies: any = Object.keys(packageJson.devDependencies).map(
    function(key) {
      return {
        name: key,
        requiredVersion: packageJson.devDependencies[key],
        isDependency: false,
      };
    }
  );

  return [...dependencies, ...devDependencies];
}

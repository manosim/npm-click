import * as React from 'react';
import Joi from '@hapi/joi';

import demoData from '../demoData.json';

const validationSchema = Joi.object({
  name: Joi.string().required(),
  version: Joi.string().required(),
  dependencies: Joi.object().pattern(Joi.string(), Joi.string()).required(),
  devDependencies: Joi.object().pattern(Joi.string(), Joi.string()),
}).required();

interface IProps {}

export const InputForm: React.FC<IProps> = () => {
  const [inputValue, setInputValue] = React.useState<string>('');
  const [formError, setFormError] = React.useState<string | null>(null);

  const useDemoData = () => {
    setInputValue(JSON.stringify(demoData, null, 2));
  };

  const validateData = React.useCallback(async () => {
    setFormError(null);

    if (!inputValue) {
      return;
    }

    try {
      const data = JSON.parse(inputValue);
      await validationSchema.validateAsync(data, { allowUnknown: true });
    } catch (err) {
      setFormError(`Invalid data: ${err.message}.`);
    }
  }, [inputValue]);

  React.useEffect(() => {
    validateData();
  }, [inputValue]);

  return (
    <div className="bg-gray-400">
      <div className="container bg-gray-100">
        <textarea
          rows={16}
          className="appearance-none block w-full bg-gray-100 text-gray-700 p-8 pb-2 mb-3 font-mono leading-tight focus:outline-none"
          placeholder="Place the contents of your package.json and I will handle the work."
          onChange={(evt: React.ChangeEvent<HTMLTextAreaElement>) =>
            setInputValue(evt.target.value)
          }
          disabled={false}
          value={inputValue}
        />

        <div className="py-3 flex justify-between">
          <div className="flex items-center">
            {inputValue && formError && (
              <div className="font-mono font-bold text-sm text-red-400 px-8 py-2">
                {formError}
              </div>
            )}
          </div>
          <button
            className="flex items-center bg-teal-400 text-white font-bold py-2 px-4 border-b-4 border-teal-600 hover:bg-teal-600 rounded focus:outline-none"
            onClick={useDemoData}
          >
            <svg
              className="fill-current w-4 h-4 mr-2"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
            >
              <path d="M13 8V2H7v6H2l8 8 8-8h-5zM0 18h20v2H0v-2z" />
            </svg>
            Demo
          </button>
        </div>
      </div>
    </div>
  );
};

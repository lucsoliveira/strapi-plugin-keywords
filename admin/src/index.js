// @ts-ignore
import { prefixPluginTranslations } from "@strapi/helper-plugin";
// @ts-ignore
import pluginPkg from "../../package.json";
import pluginId from "./pluginId";

const name = pluginPkg.strapi.name;

export default {
  register(app) {
    app.customFields.register({
      name: name,
      pluginId: pluginId,
      type: "json",
      // icon: MultiSelectIcon,
      intlLabel: {
        id: "input-currency.label",
        defaultMessage: "Keywords",
      },
      intlDescription: {
        id: "input-currency.description",
        defaultMessage: "Custom field that act as a tag selector",
      },
      components: {
        Input: async () => import("./components/Input"),
      },
      options: {
        base: [
          {
            sectionTitle: {
              id: "custom-field-keywords.color.section.format",
              defaultMessage: "Options",
            },
            items: [
              {
                name: "options.maxLength",
                type: "number",
                intlLabel: {
                  id: "options.maxLength",
                  defaultMessage: "Max length tag text",
                },
              },
              {
                name: "options.maxTags",
                type: "number",
                intlLabel: {
                  id: "options.maxLength",
                  defaultMessage: "Max quantity tags",
                },
              },
            ],
          },
          {
            sectionTitle: {
              id: "custom-field-keywords.color.section.format",
              defaultMessage: "Funcionalidades",
            },
            items: [
              {
                name: "required",
                type: "checkbox",
                intlLabel: {
                  id: "custom-field-keywords.settings.required.label",
                  defaultMessage: "Campo obrigatório",
                },
              },
              {
                name: "options.unifyEqualTags",
                type: "checkbox",
                intlLabel: {
                  id: "form.attribute.item.uniqueField",
                  defaultMessage: "Unify Equal Tags",
                },
                description: {
                  id: "form.attribute.item.uniqueField.description",
                  defaultMessage:
                    "When saving, it will be checked if there are equal tags. If so, only one value will be saved.",
                },
              },
            ],
          },
        ],
        advanced: [],
        // validator: (args) => ({
        //   format: yup.string().required({
        //     id: "options.color-picker.format.error",
        //     defaultMessage: "The color format is required",
        //   }),
        // }),
      },
    });
  },

  bootstrap(app) {},
  async registerTrads({ locales }) {
    const importedTrads = await Promise.all(
      locales.map((locale) => {
        return import(
          /* webpackChunkName: "translation-[request]" */ `./translations/${locale}.json`
        )
          .then(({ default: data }) => {
            return {
              data: prefixPluginTranslations(data, pluginId),
              locale,
            };
          })
          .catch(() => {
            return {
              data: {},
              locale,
            };
          });
      })
    );

    return Promise.resolve(importedTrads);
  },
};

import { ContainerModule, interfaces } from "inversify";
import SI from "@config/inversify.types";
import Storage from "@src/Storage/Storage";
import { SettingsType, TemplateNames, TemplateValue } from "@src/Settings/SettingsType";
import { ResolverDynamicInterface, ResolverServiceInterface } from "@src/Resolver/Interfaces";
import ResolverService from "@src/Resolver/ResolverService";
import ResolverCachedProxy from "@src/Resolver/ResolverCachedProxy";
import { Resolver } from "@src/Resolver/Resolver";

export default new ContainerModule(bind => {
    bind<interfaces.Factory<string>>(SI["factory:resolver:template"]).toFactory<string, [string]>(c => value => {
        const storage = c.container.get<Storage<SettingsType>>(SI["settings:storage"]);

        const [name, type]: [TemplateNames, keyof TemplateValue] = value.split(":") as [
            TemplateNames,
            keyof TemplateValue
        ];
        const targetTemplates = storage.get("templates").get(name);
        return targetTemplates?.get(type)?.value() ?? storage.get("templates").get("common").get(type).value();
    });

    bind<ResolverDynamicInterface>(SI.resolver).to(ResolverCachedProxy).whenTargetIsDefault();
    bind<ResolverDynamicInterface>(SI.resolver).to(Resolver).whenTargetNamed("original");
    bind<ResolverServiceInterface>(SI["resolver:service"]).to(ResolverService).inSingletonScope();
    bind<interfaces.Factory<ResolverDynamicInterface>>(
        SI["factory:resolver:resolver"]
    ).toFactory<ResolverDynamicInterface>(c => () => c.container.get<ResolverDynamicInterface>(SI.resolver));
});

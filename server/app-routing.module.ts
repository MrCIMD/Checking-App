import { Module } from "@nestjs/common";
import { RouterModule, Routes } from 'nest-router';
import { AuthModule } from "./logics/auth/auth.module";
import { ApiModule } from "./routes/api/api.module";
import { WebModule } from "./routes/web.module";
import { AuthenticateModule } from "./routes/web/authenticate/autheticate.module";
import { HomeModule } from "./routes/web/home/home.module";

const routes: Routes = [
    {
        path: 'api',
        module: ApiModule,
        children: [
            {
                path: '/auth',
                module: AuthModule
            }
        ],
    },
    {
        path: '/',
        module: WebModule,
        children: [
            {
                path: '/',
                module: HomeModule,
                
            },
            {
                path: 'auth',
                module: AuthenticateModule,
            },
        ],
    },
];

@Module({
    imports: [RouterModule.forRoutes(routes)],
    exports: [RouterModule]
  })
export class AppRoutingModule { }
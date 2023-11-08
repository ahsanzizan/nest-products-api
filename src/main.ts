import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";

import keys from "./configs/keys";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(keys.port);
  console.log("App is listening on port " + keys.port);
}

bootstrap();

# FROM node:14-alpine
FROM public.ecr.aws/s9f1h1p1/node:14 as deps

WORKDIR /app

COPY package*.json /app/

RUN npm install

FROM public.ecr.aws/s9f1h1p1/node:14 as build


WORKDIR /app

COPY --from=deps /app/node_modules /app/node_modules

COPY . .

RUN npm run-script build

# For some reason, the build script doesn't copy the .proto files. So we do it here.
# RUN cd src/ && find ./ -name '*.proto' -exec cp --parent '{}' '/app/dist/' ';'

FROM public.ecr.aws/s9f1h1p1/node:14 as runner

WORKDIR /app

COPY --from=build /app/node_modules /app/node_modules

COPY --from=build /app/dist /app/dist

COPY --from=build /app/package*.json /app/

COPY --from=build /app/scripts/entrypoint.sh /app/scripts/entrypoint.sh

COPY --from=build /app/ormconfig.ts .

COPY --from=build /app/src /app/src

RUN chmod +x /app/scripts/entrypoint.sh

ENTRYPOINT [ "/app/scripts/entrypoint.sh" ]

# CMD ["npm", "run", "start:dev"]

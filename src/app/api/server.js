const { default: App } = require("next/app");
const { authOptions } = require("./auth/[...nextauth]/route");
const { getServerSession } = require("next-auth");

// Obtener la sesión del servidor
const serverSession = await getServerSession(authOptions);

// Serializar la sesión
const serializedSession = JSON.stringify(serverSession);

// Renderizar la aplicación con la sesión serializada en el contexto
renderToString(
  <AppContext.Provider value={{ session: serializedSession }}>
    <App />
  </AppContext.Provider>,
);

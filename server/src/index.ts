import httpServer from "./server";

const PORT = (process as any).env.PORT || 4000;

httpServer.listen(PORT, undefined, () => {
  console.log(`🎮 Temple Game Server is running on port ${PORT}!`);
});

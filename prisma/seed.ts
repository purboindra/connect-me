import prisma from "../lib/prisma";
// run inside `async` function
async function main() {
  const alice = await prisma.user.upsert({
    where: { email: "alice@prisma.io" },
    update: {},
    create: {
      email: "alice@prisma.io",
      username: "Alice",
      password: "qwerty",
      photo_url: "",
      bio: "",
      comments: {},
      posts: {},
      created_at: new Date(),
      followers: {},
      following: {},
      id: 1,
      likes: {},
      refreshTokens: {},
      tokens: {},
    },
  });

  console.log({ alice });
}
main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });

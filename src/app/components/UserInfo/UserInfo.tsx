// import { auth, currentUser } from "@clerk/nextjs/server";
// import { db } from "../../../../db";
// import { TransactionTable, UserTable } from "../../../../db/schema";
// import { eq } from "drizzle-orm";

// import s from "./UserInfo.module.scss";

// export const UserInfo = async () => {
//   const { userId } = await auth();
//   const clerkUser = await currentUser();

//   if (!userId || !clerkUser) {
//     return null;
//   }

//   const dbUser = await db.select().from(UserTable).where(eq(UserTable.clerkUserId, userId)).limit(1);

//   const user = dbUser[0];

//   const dbTransaction = user ? await db.select().from(TransactionTable).where(eq(TransactionTable.userId, user.id)) : [];
//   console.log("🚀 ~ UserInfo ~ dbTransaction:", dbTransaction);

//   return (
//     <div className={s.userInfo}>
//       <h3>Информация о пользователе</h3>
//       <div className={s.userInfo__details}>
//         <p>
//           <strong>Clerk ID:</strong> {clerkUser.id}
//         </p>
//         <p>
//           <strong>Email:</strong> {clerkUser.emailAddresses[0]?.emailAddress}
//         </p>
//         <p>
//           <strong>Имя:</strong> {clerkUser.firstName} {clerkUser.lastName}
//         </p>
//         {user && (
//           <div className={s.userInfo__db}>
//             <h4>Данные из базы:</h4>
//             <p>
//               <strong>DB ID:</strong> {user.id}
//             </p>
//             <p>
//               <strong>Имя в БД:</strong> {user.name}
//             </p>
//             <p>
//               <strong>Email в БД:</strong> {user.email}
//             </p>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

import { database } from '../services/firebase';

type FirebaseRoom = {
  authorId: string;
  questions: {};
  title: string;
};

export async function useAuthorRoom(roomId: string) {
  const roomRef = await database.ref(`rooms/${roomId}`).get();
  const firebaseRoom: FirebaseRoom = roomRef.val();

  const authorRoom: string = firebaseRoom.authorId;

  console.log(`Author Room: ${authorRoom}`);

  return authorRoom;
}

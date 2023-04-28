import React, { useEffect, useCallback, useState } from "react";
import ReactPlayer from "react-player";
import peer from "../../service/peer";
import { useSocket } from "../../contex/socketProvider";
import { IoMdCall } from "react-icons/io";
import { MdJoinFull } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import Rating_modal from  "../Client/RatingModal/Rating_modal"

const RoomPage = () => {
  const navigate = useNavigate();
  const room = useSelector((state) => state.room.room);
  const socket = useSocket();
  const [remoteSocketId, setRemoteSocketId] = useState(null);
  const [myStream, setMyStream] = useState();
  const [remoteStream, setRemoteStream] = useState();
  const [chat, setChat] = useState("");
  const [displayChat, setDisplayChat] = useState("");
  const[modal,setModal]=useState(false)


  const studentid = useSelector(state => state.student._id)
  const teacher = useSelector(state => state.tutor.tutor_id)

 console.log(teacher,"teacherrrrr iddddddddd");
  console.log(studentid,"student iddddddddd");


  const handleUserJoined = useCallback(({ email, id }) => {
    console.log(`Email ${email} joined room`);
    setRemoteSocketId(id);
  }, []);

  const handleCallUser = useCallback(async () => {
    const stream = await navigator.mediaDevices.getUserMedia({
      audio: true,
      video: true,
    });
    const offer = await peer.getOffer();
    socket.emit("user:call", { to: remoteSocketId, offer });
    setMyStream(stream);
  }, [remoteSocketId, socket]);

  const handleIncommingCall = useCallback(
    async ({ from, offer }) => {
      setRemoteSocketId(from);
      const stream = await navigator.mediaDevices.getUserMedia({
        audio: true,
        video: true,
      });
      setMyStream(stream);
      console.log(`Incoming Call`, from, offer);
      const ans = await peer.getAnswer(offer);
      socket.emit("call:accepted", { to: from, ans });
    },
    [socket]
  );

  const sendStreams = useCallback(() => {
    for (const track of myStream.getTracks()) {
      peer.peer.addTrack(track, myStream);
    }
  }, [myStream]);

  const handleCallAccepted = useCallback(
    ({ from, ans }) => {
      peer.setLocalDescription(ans);
      console.log("Call Accepted!");
      sendStreams();
    },
    [sendStreams]
  );

  const handleNegoNeeded = useCallback(async () => {
    const offer = await peer.getOffer();
    socket.emit("peer:nego:needed", { offer, to: remoteSocketId });
  }, [remoteSocketId, socket]);

  useEffect(() => {
    peer.peer.addEventListener("negotiationneeded", handleNegoNeeded);
    return () => {
      peer.peer.removeEventListener("negotiationneeded", handleNegoNeeded);
    };
  }, [handleNegoNeeded]);

  const handleNegoNeedIncomming = useCallback(
    async ({ from, offer }) => {
      const ans = await peer.getAnswer(offer);
      socket.emit("peer:nego:done", { to: from, ans });
    },
    [socket]
  );

  const handleChat = useCallback(async (e) => {
    e.preventDefault();
    socket.emit("user:chatInvideo", { to: room, chat });
    setChat("");
  });

  const handleDisplayChat = useCallback(({ chat }) => {
    setDisplayChat(chat);
  });

  const handleNegoNeedFinal = useCallback(async ({ ans }) => {
    await peer.setLocalDescription(ans);
  }, []);

  const deleteStream = () => {
    setRemoteStream();
    setMyStream();
    if(teacher){
     navigate("/tutor/booking_list")
    }
    else{
      
      setModal(true)
    }
  };

  useEffect(() => {
    peer.peer.addEventListener("track", async (ev) => {
      console.log(ev,"GOT TRACKS!!");
      alert(ev,"GOT TRACKS!!");
      const remoteStream = ev.streams;
      console.log("GOT TRACKS!!");
      setRemoteStream(remoteStream[0]);
    });
  }, []);

  useEffect(() => {
    // socket.on('student:notification', handleNotification);
    socket.on("user:joined", handleUserJoined);
    socket.on("incomming:call", handleIncommingCall);
    socket.on("call:accepted", handleCallAccepted);
    socket.on("peer:nego:needed", handleNegoNeedIncomming);
    socket.on("peer:nego:final", handleNegoNeedFinal);
    socket.on("user:displaychat", handleDisplayChat);

    return () => {
      socket.off("user:joined", handleUserJoined);
      socket.off("incomming:call", handleIncommingCall);
      socket.off("call:accepted", handleCallAccepted);
      socket.off("peer:nego:needed", handleNegoNeedIncomming);
      socket.off("peer:nego:final", handleNegoNeedFinal);
    };
  }, [
    socket,
    handleUserJoined,
    handleIncommingCall,
    handleCallAccepted,
    handleNegoNeedIncomming,
    handleNegoNeedFinal,
  ]);

  return (
    <div>


       {modal&&<Rating_modal modal={modal} setModal={setModal}/>}
      <div class="w-full max-w-sm p-4 bg-white border border-gray-200 rounded-lg shadow sm:p-6 md:p-8 dark:bg-gray-800 dark:border-gray-700">
        <form class="space-y-6" onSubmit={handleChat}>
          <div>
            <h1>{displayChat}</h1>
          </div>
          <div class="flex items-start">
            <div class="flex items-start">{/* <h1>haaaaai</h1> */}</div>
          </div>
          <div class="flex">
            <input
              onChange={(e) => setChat(e.target.value)}
              type="text"
              value={chat}
              name="text"
              id="password"
              placeholder="Type something"
              class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
              required
            />
            <button
              type="submit"
              class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            >
              send
            </button>
          </div>
        </form>
      </div>

      <div className="h-full py-10 flex items-center justify-center">
        {!myStream && (
          <div
            className="h-96 w-1/2  font-italic flex items-center justify-center  bg-no-repeat bg-cover bg-center"
            style={{ backgroundImage: `url("../../../video.png" )` }}
          >
            <h1>Room Page</h1>

            <h4 className="font-bold">
              {remoteSocketId ? "Connected" : "No one in room"}
            </h4>

            {remoteSocketId && <button onClick={handleCallUser}>CALL</button>}
          </div>
        )}

        <div className="flex-row h-full">
          {myStream && (
            <>
              <h1>My Stream</h1>
              <ReactPlayer
                playing
                muted
                height="50%"
                width="100%"
                url={myStream}
              />
              {myStream && (
                <button onClick={sendStreams}>
                  <MdJoinFull size={40} color="green" />
                </button>
              )}

              <div className="mx-96">
                {" "}
                <IoMdCall size={40} color="red" onClick={deleteStream} />
              </div>
            
            </>
          )}
          {remoteStream && (
            <>
              <h1>Remote Stream</h1>
              <ReactPlayer
                playing
                muted
                height="100px"
                width="100%"
                url={remoteStream}
              />
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default RoomPage;

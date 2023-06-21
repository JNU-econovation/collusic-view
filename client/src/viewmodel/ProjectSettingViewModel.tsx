import { FormEvent, MouseEvent, useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useRecoilState } from "recoil";

import { bpmState, inputDeviceTextState, selectedTrackState, projectNameState } from "model/projectModel";
import ProjectSetting from "components/blocks/ProjectSetting";
import { trackList as trackTagList } from "utils/data/track";
import { Track } from "types/projectType";
import { addProject, getProject } from "api/project";
import useAudios from "hooks/useAudios";

function ProjectSettingViewModel() {
  const [bpm, setBpm] = useRecoilState(bpmState);
  const [projectName, setProjectName] = useRecoilState(projectNameState);
  const [selectedTrackTag, setSelectedTrackTag] = useRecoilState(selectedTrackState);
  const [inputTextDevice, setInputTextDevice] = useRecoilState(inputDeviceTextState);
  const [inputDeviceId, setInputDeviceId] = useState("");
  const mediaRecorderRef = useRef<MediaRecorder>();

  const navigate = useNavigate();
  const { projectId } = useParams();

  const { audioList, setAudios, addAudio, time, setTime, isPlaying: isAudioPlaying, toggle: toggleAudio } = useAudios();

  useEffect(() => {
    if (!projectId) {
      return;
    }

    getProject(projectId).then(({ bpm, projectName, tracks }) => {
      setBpm(bpm);
      setProjectName(projectName);
      const sourceList = tracks.map(({ fileUrl }) => fileUrl);
      setAudios(sourceList);
    });
  }, []);

  // 트랙 녹음
  const recordTrack = async () => {
    if (!mediaRecorderRef.current) {
      try {
        // 녹음 데이터 저장 배열
        const audioArray: BlobPart[] = [];
        const stream = await navigator.mediaDevices.getUserMedia({
          audio: {
            deviceId: inputDeviceId,
          },
        });
        const mediaRecorder = new MediaRecorder(stream);
        mediaRecorderRef.current = mediaRecorder;

        // 녹음 데이터 취득
        mediaRecorder.ondataavailable = (e) => {
          audioArray.push(e.data);
        };

        // 녹음이 종료되었을 때
        mediaRecorder.onstop = () => {
          // 배열에 담긴 오디오데이터 합치고, 코덱 설정
          const blob = new Blob(audioArray, { type: "audio/ogg codecs=opus" });
          audioArray.splice(0); // 기존 오디오 데이터 초기화

          addAudio(blob);

          // blob 데이터 접근 주소 생성
          const blobUrl = URL.createObjectURL(blob);

          // TODO: 파형에 녹음된 파일 표시
        };
      } catch (err) {
        console.log(err);
        alert("녹음이 가능한 입력장치가 아닙니다.");
      }
    }
  };
  // 입력장치 선택
  const handleDeviceClick = (deviceId: string, deviceName: string) => {
    setInputDeviceId(deviceId);
    setInputTextDevice(deviceName);
  };
  // 등록할 트랙 태그 선택
  const handleTrackClick = (e: MouseEvent) => {
    if (!e.currentTarget.lastChild) {
      alert("트랙을 다시 선택해주세요.");
    }
    setSelectedTrackTag(e.currentTarget.lastChild?.nodeValue as Track);
  };
  // 프로젝트 bpm 설정
  const handleBpmInput = (e: FormEvent) => {
    setBpm(Number((e.currentTarget as HTMLInputElement).value));
  };
  // 프로젝트 이름 설정
  const handleTitleInput = (e: FormEvent) => {
    setProjectName((e.currentTarget as HTMLInputElement).value);
  };
  // 프로젝트 생성하기 버튼 클릭
  const handleBtnClick = () => {
    const createProject = async () => {
      const data = await addProject({ projectName, trackTag: selectedTrackTag, bpm });
      navigate(`/detailProject/?id=${data.id}`);
    };
    createProject();
  };

  return (
    <ProjectSetting
      onDeviceClick={handleDeviceClick}
      onTrackClick={handleTrackClick}
      onBtnClick={handleBtnClick}
      onBpmInput={handleBpmInput}
      onTitleInput={handleTitleInput}
      onRecord={recordTrack}
      mediaRecorderRef={mediaRecorderRef}
      bpmState={bpm}
      selectedTrackTag={selectedTrackTag}
      trackTags={trackTagList}
      inputTextDevice={inputTextDevice}
      time={time}
      setTime={setTime}
      isAudioPlaying={isAudioPlaying}
      toggleAudio={toggleAudio}
      audioTracks={audioList}
    />
  );
}

export default ProjectSettingViewModel;

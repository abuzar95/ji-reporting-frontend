import { Box } from "../halqa";
import { sumUpTwoValues } from "../muntakhibMaqamReports";

export const RozOShabDiary = ({ view }) => {
  return (
    <div className="p-2 py-5 relative w-full overflow-auto">
      <h2 className="text-black py-3 text-lg">روزشب ڈائری</h2>
      <div className="flex flex-col w-full items-start gap-4 justify-start">
        {/* <div className='flex py-2 ml-4'>
          <label className='block'> کتنے ارکان فل کرتے ہیں:</label>
          <input
            readOnly={view}
            type='number'
            defaultValue={0}
            required
            name='arkanFilled'
            id='arkanFilled'
            className='border-b-2 text-center border-dashed'
          />
        </div> */}
        <div style={{ display: "flex" }}>
          <label className="block min-w-[40%]">
            کتنے امیدواران فل کرتے ہیں؟
          </label>
          <input
            readOnly={true}
            type="number"
            defaultValue={0}
            required
            name={`umeedwaranFilled`}
            id={`umeedwaranFilled`}
            className="border-b-2 text-center border-dashed "
          />
          +
          <input
            type="number"
            readOnly={view}
            placeholder="ذیلی حلقہ"
            required
            name={`manualUmeedwaran`}
            id={`manualUmeedwaran`}
            className="border-b-2 text-center border-dashed "
            onChange={() =>
              sumUpTwoValues(
                parseInt(document.getElementById("umeedwaranFilled").value),
                parseInt(document.getElementById("manualUmeedwaran").value),
                "umeedwaranFilledSum"
              )
            }
          />
          =
          <input
            readOnly={true}
            type="number"
            defaultValue={document.getElementById("umeedwaranFilled")?.value
            }
            required
            name={`umeedwaranFilledSum`}
            id={`umeedwaranFilledSum`}
            className="border-b-2 text-center border-dashed "
          />
        </div>
        <div style={{ display: "flex" }}>
          <label className="block min-w-[40%]">کتنےرفقافل کرتے ہیں:</label>

          <input
            readOnly={true}
            type="number"
            defaultValue={0}
            required
            name={`rafaqaFilled`}
            id={`rafaqaFilled`}
            className="border-b-2 text-center border-dashed "
          />

          +
          <input
            type="number"
            readOnly={view}
            placeholder="ذیلی حلقہ"
            required
            name={`manualRafaqaFilled`}
            id={`manualRafaqaFilled`}
            className="border-b-2 text-center border-dashed "
            onChange={() =>
              sumUpTwoValues(
                parseInt(document.getElementById("rafaqaFilled").value),
                parseInt(document.getElementById("manualRafaqaFilled").value),
                "rafaqaFilledSum"
              )
            }
          />
          =
          <input
            readOnly={true}
            type="number"
            defaultValue={document.getElementById("rafaqaFilled")?.value
            }
            required
            name={`rafaqaFilledSum`}
            id={`rafaqaFilledSum`}
            className="border-b-2 text-center border-dashed "
          />
        </div>
        {/* <div className="flex py-2">
          <label className="block min-w-[40%]">کتنے امیدواران فل کرتے ہیں؟</label>
          <input
            readOnly={view}
            type="number"
            defaultValue={0}
            required
            name="umeedwaranFilled"
            id="umeedwaranFilled"
            className="border-b-2 text-center border-dashed"
          />
        </div>
        <div className="flex py-2 ">
          <label className="block min-w-[40%]">کتنےرفقافل کرتے ہیں:</label>
          <input
            readOnly={true}
            type="number"
            defaultValue={0}
            required
            name="rafaqaFilled"
            id="rafaqaFilled"
            className="border-b-2 text-center border-dashed"
          />
        </div> */}
      </div>
    </div>
  );
};

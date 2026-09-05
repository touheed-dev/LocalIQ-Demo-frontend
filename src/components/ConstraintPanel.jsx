import { Clock, Wallet, SlidersHorizontal, Users, Accessibility } from "lucide-react";
import { INTERESTS, GROUPS, ACCESSIBILITY_OPTIONS, TIME_OPTIONS, timeLabel } from "../mockData/experiences";
import { Chip, Segmented } from "./ui";

function ControlSelect({ icon: Icon, value, onChange, options, format }) {
  return (
    <label className="control">
      <Icon size={14} strokeWidth={2.2} />
      <select value={value} onChange={(e) => onChange(e.target.value)}>
        {options.map((o) => (
          <option key={o} value={o}>
            {format ? format(o) : o}
          </option>
        ))}
      </select>
    </label>
  );
}

export default function ConstraintPanel({ constraints, onUpdate }) {
  const toggleInterest = (i) => {
    const has = constraints.interests.includes(i);
    onUpdate("interests", has
      ? constraints.interests.filter((x) => x !== i)
      : [...constraints.interests, i]);
  };

  return (
    <div className="constraints">
      <div className="constraints__row">
        <div className="constraint">
          <span className="constraint__label"><Clock size={11} /> Time</span>
          <ControlSelect
            icon={Clock}
            value={constraints.time}
            onChange={(v) => onUpdate("time", Number(v))}
            options={TIME_OPTIONS}
            format={timeLabel}
          />
        </div>

        <div className="constraints__divider" />

        <div className="constraint">
          <span className="constraint__label"><Wallet size={11} /> Budget</span>
          <div style={{ display: "flex", gap: 6, alignItems: "center" }}>
            <ControlSelect
              icon={Wallet}
              value={String(constraints.budget)}
              onChange={(v) => onUpdate("budget", Number(v))}
              options={["500", "700", "1000", "1500", "2500"]}
              format={(v) => `₹${Number(v).toLocaleString("en-IN")}`}
            />
          </div>
        </div>

        <div className="constraints__divider" />

        <div className="constraint" style={{ flex: 1, minWidth: 320 }}>
          <span className="constraint__label"><SlidersHorizontal size={11} /> Interests</span>
          <div className="interest-group">
            {INTERESTS.map((i) => (
              <Chip key={i} small active={constraints.interests.includes(i)} onClick={() => toggleInterest(i)}>
                {i}
              </Chip>
            ))}
          </div>
        </div>

        <div className="constraints__divider" />

        <div className="constraint">
          <span className="constraint__label"><Users size={11} /> Group</span>
          <Segmented options={GROUPS} value={constraints.group} onChange={(g) => onUpdate("group", g)} />
        </div>

        <div className="constraints__divider" />

        <div className="constraint">
          <span className="constraint__label"><Accessibility size={11} /> Accessibility</span>
          <ControlSelect
            icon={Accessibility}
            value={constraints.accessibility}
            onChange={(v) => onUpdate("accessibility", v)}
            options={ACCESSIBILITY_OPTIONS.map((o) => o.value)}
            format={(v) => ACCESSIBILITY_OPTIONS.find((o) => o.value === v)?.label}
          />
        </div>
      </div>
    </div>
  );
}